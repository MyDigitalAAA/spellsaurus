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

// Error handling
const { HttpError } = require('../validations/Errors')

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
            .catch(err => {
                reject(new HttpError(500, "Couldn't get users"))
            })
        })
    }

    getOneByUUID(uuid) {
        return new Promise((resolve, reject) => {
            model.forge()
            .where({ 'uuid' : uuid })
            .fetch()
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                reject(new HttpError(500, "Couldn't get user"))
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
            .catch(err => {
                reject(new HttpError(500, "Couldn't get user"))
            })
        })
    }

    addOne(u) {
        return new Promise(async (resolve, reject) => {
            // Checks if body exists and if the model fits, and throws errors if it doesn't
            if (isEmptyObject(u)) {
                reject(new HttpError(403, "Error: User cannot be nothing !"))
            } else if (!v.validate(u, UserValidation).valid) {
                reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(u, UserValidation).errors))
            } else if (isXSSAttempt(u.name) || isXSSAttempt(u.password) || isXSSAttempt(u.mail)) {
                reject(new HttpError(403, 'Injection attempt detected, aborting the request.'))
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
                        return this.getOneByUUID(uuid)
                    })
                    .then(newUser => {
                        resolve({
                            "message": "Account successfully created !",
                            "data": {
                                "uuid": newUser.uuid,
                                "name": newUser.name,
                                "mail": newUser.mail,
                            },
                        })
                    })
                    .catch(err => {
                        throw err
                    })
                })
                .catch(() => {
                    reject(new HttpError(403, 'Email is already in use !'))
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
                if (match) {
                    resolve({
                        "message": "User successfully logged in !",
                        "logged?": true,
                        "data": {
                            "uuid": fetchedUser.uuid
                        },
                    })
                } else {
                    resolve({
                        "message": "The email and passwords don't match",
                        "logged?": false,
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
                reject(false)
            })
            .catch(() => {
                resolve(true)
            })
        })
    }
}

module.exports = UserRepository