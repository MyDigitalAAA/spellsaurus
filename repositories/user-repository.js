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
                console.log(err)
                reject(new HttpError(500, "Couldn't get users"))
            })
        })
    }

    getOneFromUUID(uuid) {
        return new Promise((resolve, reject) => {
            model.forge()
            .where({ 'uuid' : uuid })
            .fetch()
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
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

                // Needs to account for duplicate emails
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
                        console.log(err)
                    })
                })

            }
        })
    }
}

module.exports = UserRepository