'use strict'
// Bookshelf
const bookshelf = require('../database/bookshelf').bookshelf
const model = require('../models/user-model')

// Hashing and passwords
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

// Model validation
const Validator = require('jsonschema').Validator
const v = new Validator()
const UserValidation = require("../validations/UserValidation")
v.addSchema(UserValidation, "/UserValidation")

// Validations
const isXSSAttempt = require('../functions').isXSSAttempt
const isEmptyObject = require('../functions').isEmptyObject

class UserRepository {

    constructor() {
    }

    getAll() {
        return new Promise((resolve, reject) => {
            model.forge()
            .fetchAll()
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(() => {
                reject({
                    "message": "Database error, couldn't get all users.",
                    "code": 500
                })
            })
        })
    }

    getOneByUUID(uuid, full) {
        return new Promise((resolve, reject) => {
            model.forge()
            .where({ 'uuid' : uuid })
            .fetch()
            .then(v => {
                resolve(v.toJSON({ omitPivot: true, visibility: !full }))
            })
            .catch(err => {
                reject({
                    "message": "User with this UUID was not found.",
                    "code": 404
                })
            })
        })
    }

    getOneByEmail(mail, full) {
        return new Promise((resolve, reject) => {
            model.forge()
            .where({ 'mail': mail })
            .fetch()
            .then(v => {
                resolve(v.toJSON({ omitPivot: true, visibility: !full }))
            })
            .catch(() => {
                reject({
                    "message": "User with this email was not found.",
                    "code": 404
                })
            })
        })
    }

    addOne(u) {
        return new Promise(async (resolve, reject) => {
            // Checks if body exists and if the model fits, and throws errors if it doesn't
            if (isEmptyObject(u)) {
                reject({
                    "message":  "Request body cannot be empty.",
                    "code": 403
                })
            } else if (!v.validate(u, UserValidation).valid) {
                reject({
                    "message":  "Schema is not valid - " + v.validate(u, UserValidation).errors,
                    "code": 403
                })
            } else if (isXSSAttempt(u.name) || isXSSAttempt(u.password) || isXSSAttempt(u.mail)) {
                reject({
                    "message": "Injection attempt detected, aborting the request.",
                    "code": 403
                })
            } else {
                let hash = await bcrypt.hash(u.password, 10)
                let uuid = uuidv4()

                this.checkIfEmailAvailable(u.mail)
                .then(() => {
                    bookshelf.transaction(t => {
                        return model.forge({
                            'uuid': uuid,
                            'name': u.name,
                            'mail': u.mail,
                            'password': hash,
                        })
                        .save(null, {
                            transacting: t
                        })
                        .catch(err => {
                            throw err
                        })
                    })
                    .then(() => {
                        return this.getOneByUUID(uuid, false)
                    })
                    .then(newUser => {
                        resolve({
                            "message": "Account successfully created !",
                            "code": 201,
                            "token": newUser.uuid,
                        })
                    })
                    .catch(err => {
                        resolve({
                            "message": "An error has occured while creating your account.",
                            "code": 500,
                        })
                    })
                })
                .catch(err => {
                    reject(err)
                })
            }
        })
    }

    // Log user with an email address and a password
    logUser(mail, password) {
        return new Promise((resolve, reject) => {
            this.getOneByEmail(mail, true)
            .then(async fetchedUser => {

                let match = await bcrypt.compare(password, fetchedUser.password)
                delete fetchedUser.id
                delete fetchedUser.password

                if (match) {
                    resolve({
                        "message": "User successfully logged in !",
                        "code": 200,
                        "token": fetchedUser.uuid,
                    })
                } else {
                    reject({
                        "message": "Authentification attempt failed ; credentials are incorrect.",
                        "code": 400,
                    })
                }
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    // Check if one user already has that email
    checkIfEmailAvailable(mail) {
        return new Promise((resolve, reject) => {
            this.getOneByEmail(mail, false)
            .then(() => {
                reject({
                    "message": "This email is already linked to an account.",
                    "code": 403
                })
            })
            .catch(() => {
                resolve(true)
            })
        })
    }
}

module.exports = UserRepository