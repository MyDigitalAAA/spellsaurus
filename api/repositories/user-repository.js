'use strict'
// Bookshelf
const bookshelf = require('../database/bookshelf').bookshelf
const model = require('../models/user-model')

// Hashing and passwords
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

// Mailing methods
const mails = require('../smtp/mails')

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
                    "message": "Erreur de base de données, les utilisateurs n'ont pas pu être récupérés.",
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
                    "message": "L'utilisateur avec cet UUID n'a pas été trouvé.",
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
                    "message": "L'utilisateur avec cet email n'a pas été trouvé.",
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
                    "message":  "Le corps de requête ne peut être vide.",
                    "code": 403
                })
            } else if (!v.validate(u, UserValidation).valid) {
                reject({
                    "message":  "Structure de la requête invalide - " + v.validate(u, UserValidation).errors,
                    "code": 403
                })
            } else if (isXSSAttempt(u.name) || isXSSAttempt(u.password) || isXSSAttempt(u.mail)) {
                reject({
                    "message": "Essai d'injection détecté, avortement de la requête.",
                    "code": 403
                })
            } else {
                let hash = await bcrypt.hash(u.password, 10)

                let uuid = uuidv4()
                let verification_token = uuidv4();

                this.checkIfEmailAvailable(u.mail)
                .then(() => {
                    bookshelf.transaction(t => {
                        return model.forge({
                            'uuid': uuid,
                            'name': u.name,
                            'mail': u.mail,
                            'password': hash,
                            'verification_token': verification_token,
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

                        // Send a mail to the new user's email with a link to verification url
                        mails.sendRegistrationMail({
                            user: {
                                name: newUser.name,
                                mail: newUser.mail,
                                token: verification_token,
                            }
                        })

                        // Then resolves the api call
                        resolve({
                            "message": `Compte utilisateur #${newUser.id} créé avec succès.`,
                            "code": 201,
                            "user": newUser,
                        })
                    })
                    .catch(err => {
                        resolve({
                            "message": "Une erreur s'est produite en créant votre compte. Veuillez réessayer ultérieurement ou contactez l'administrateur.",
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
                  if (fetchedUser.banned) {
                    reject({
                      "message":  `L'utilisateur #${fetchedUser.name} a été banni, la connexion est impossible.`,
                      "code": 403
                    })
                  } else if (!fetchedUser.verified) {
                    reject({
                      "message":  `L'utilisateur #${fetchedUser.name} n'as pas été vérifié, le compte doit être activé avant la connexion.`,
                      "code": 401
                    })
                  } else {
                    resolve({
                        "message": `L'utilisateur #${fetchedUser.name} s'est connecté.`,
                        "code": 200,
                        "user": fetchedUser,
                    })
                  }
                } else {
                    reject({
                        "message": "Les informations de connexions sont erronées.",
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

            if (!this.validateEmail(mail)) {
                reject({
                    "message": "La requête n'est pas un email valide.",
                    "code": 400,
                })
            }

            this.getOneByEmail(mail, false)
            .then(() => {
                reject({
                    "message": "Cet email est déjà lié à un compte.",
                    "code": 409
                })
            })
            .catch(() => {
                resolve({
                  "message": "Cet email est disponible.",
                  "code": 200
              })
            })
        })
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}

module.exports = UserRepository