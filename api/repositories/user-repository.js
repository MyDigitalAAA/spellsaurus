'use strict'
// Bookshelf
const bookshelf = require('../database/bookshelf').bookshelf;
const model = require('../models/user-model');
const token_model = require('../models/api-token-model');

// Hashing and passwords
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// Mailing methods
const mails = require('../smtp/mails');

// Model validation
const Validator = require('jsonschema').Validator;
const v = new Validator();
const UserValidation = require("../validations/UserValidation");
v.addSchema(UserValidation, "/UserValidation");

// Validations
const isXSSAttempt = require('../functions').isXSSAttempt;
const isEmptyObject = require('../functions').isEmptyObject;

class UserRepository {

    constructor() {
    }

    /**
     * Fetches all users in the dabatase.
     * 
     * @returns { Promise }
     *    Fulfilled data: Array of user objects.
     */
    getAll() {
        return new Promise((resolve, reject) => {
            new model()
            .fetchAll({ withRelated: [ 'role.permissions' ] })
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }));
            })
            .catch(err => {
                console.log(err)
                reject({
                    "message": "Erreur de base de données, les utilisateurs n'ont pas pu être récupérés.",
                    "code": 500,
                });
            })
        })
    }

    /**
     * Fetches a user object associated with the uuid.
     * 
     * @param { string } uuid
     * @param { boolean } full
     *    Whether the password should also be fetched. (should never be true unless you want to log the user)
     * 
     * @returns { Promise }
     *    Fulfilled data: Queried user object. 
     */
    getOneByUUID(uuid, full) {
        return new Promise((resolve, reject) => {

            if (!(uuid)) {
                reject({
                    "message": "La requête doit renseigner un uuid.",
                    "code": 400,
                })
            }

            new model()
            .where({ 'uuid' : uuid })
            .fetch({ withRelated: [ 'role.permissions' ] })
            .then(v => {
                resolve(v.toJSON({ omitPivot: true, visibility: !full }));
            })
            .catch(() => {
                reject({
                    "message": "L'utilisateur avec cet UUID n'a pas été trouvé.",
                    "code": 404,
                });
            })
        })
    }

    /**
     * Fetches a user object associated with the mail address.
     * 
     * @param { string } mail
     * @param { boolean } full
     *    Whether the password should also be fetched. (should never be true unless you want to log the user)
     * 
     * @returns { Promise }
     *    Fulfilled data: Queried user object. 
     */
    getOneByEmail(mail, full) {
        return new Promise((resolve, reject) => {

            if (!(mail)) {
                reject({
                    "message": "La requête doit renseigner un email.",
                    "code": 400,
                })
            }

            new model()
            .where({ 'mail': mail })
            .fetch({ withRelated: [ 'role' ] })
            .then(v => {
                resolve(v.toJSON({ omitPivot: true, visibility: !full }));
            })
            .catch(() => {
                reject({
                    "message": "L'utilisateur avec cet email n'a pas été trouvé.",
                    "code": 404,
                });
            });
        })
    }

    /**
     * Fetches all spells linked to a user's uuid
     * 
     * @param { string } uuid
     * 
     * @returns 
     */
    getSpellsFromOne(uuid) {
        return new Promise((resolve, reject) => {

            if (!(uuid)) {
                reject({
                    "message": "La requête doit renseigner un uuid.",
                    "code": 400,
                })
            }

            new model()
            .where({ 'uuid': uuid })
            .fetch({ withRelated: [ 'role', 'spells.schools.meta_schools', 'spells.variables', 'spells.ingredients' ] })
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }));
            })
            .catch(() => {
                reject({
                    "message": "Les sorts liés à cet utilisateur n'ont pas été trouvés.",
                    "code": 404,
                });
            });
        })
    }

    /**
     * Registers a user based on the model at ./models/user-model.js.
     * 
     * @param { object} u
     *    User object
     * 
     * @returns { Promise }
     *    Fulfilled data: Queried user object.
     */
    addOne(u) {
        return new Promise(async (resolve, reject) => {
            // Checks if body exists and if the model fits, and throws errors if it doesn't
            if (isEmptyObject(u)) {
                reject({
                    "message":  "Le corps de requête ne peut être vide.",
                    "code": 403,
                })
            } else if (!v.validate(u, UserValidation).valid) {
                reject({
                    "message":  "Structure de la requête invalide - " + v.validate(u, UserValidation).errors,
                    "code": 403,
                })
            } else if (isXSSAttempt(u.name) || isXSSAttempt(u.password) || isXSSAttempt(u.mail)) {
                reject({
                    "message": "Essai d'injection détecté, avortement de la requête.",
                    "code": 403,
                })
            } else {
                let hash = await bcrypt.hash(u.password, 10);

                let uuid = uuidv4();
                let verification_token = uuidv4();

                this.checkIfEmailAvailable(u.mail)
                .then(() => {
                    bookshelf.transaction(t => {
                        return new model({
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
                            console.log(err);
                            reject({
                                "message": "Un attribut de l'utilisateur a provoqué une erreur d'insertion.",
                                "code": 500,
                            });
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
                        });

                        // Then resolves the api call
                        resolve({
                            "message": `Compte utilisateur #${newUser.id} créé avec succès.`,
                            "code": 201,
                            "user": newUser,
                        });
                    })
                    .catch(err => {
                        console.log(err);
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

    /**
     * Verifies an account based on a private UUID token
     * 
     * @param { string } token
     *    A UUID v4 identification token provided at registration and on special demands
     * 
     * @returns Redirects to login page
     */
    verifyUser(token) {
        return new Promise((resolve, reject) => {
            new model()
            .where({ 'verification_token' : token })
            .fetch()
            .then(v => {
                bookshelf.transaction(t => {
                    return v.save({
                        'verification_token': null,
                        'verified': 1,
                    }, {
                        method: 'update',
                        transacting: t
                    })
                })
                .then(() => {
                  resolve({
                      "message": "Insérez ici une future redirection vers le client.",
                      "code": 202,
                  })
                })
            })
            .catch(() => {
                reject({
                    "message": "Le lien de vérification ne semble pas correct.",
                    "code": 404,
                })
            })
        });
    }

    /**
     * Logs a user by comparing the dual mail/password inputs
     * 
     * @param { string } mail
     * @param { string } password
     * 
     * @return { Promise }
     *    Fulfilled data: Queried user object.
     */
    logUser(mail, password) {
        return new Promise((resolve, reject) => {
            this.getOneByEmail(mail, true)
            .then(async fetchedUser => {

                let match = await bcrypt.compare(password, fetchedUser.password);

                // Makes sure no hash gets out
                delete fetchedUser.password;

                // If you found a user...
                if (match) {
                    // If they're banned...
                    if (fetchedUser.banned) {
                        reject({
                            "message":  `L'utilisateur #${fetchedUser.name} a été banni, la connexion est impossible.`,
                            "code": 403,
                        });
                    // If they're not verified...
                    } else if (!fetchedUser.verified) {
                        reject({
                            "message":  `L'utilisateur #${fetchedUser.name} n'as pas été vérifié, le compte doit être activé avant la connexion.`,
                            "code": 401,
                        });
                    } else {
                        resolve({
                            "message": `L'utilisateur #${fetchedUser.name} s'est connecté.`,
                            "code": 200,
                            "user": fetchedUser,
                        });
                    }
                } else {
                    reject({
                        "message": "Les informations de connexions sont erronées.",
                        "code": 400,
                    });
                }
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    /**
     * Generate a token for the user to use the API
     * Requires mail and password for verifying the user
     * 
     * @param { string } mail
     * @param { string } password
     * 
     * @returns { Promise }
     *    Fulfilled data: A unique UUID token string.
     */
    genAPIToken(mail, password) {
        return new Promise((resolve, reject) => {
            this.logUser(mail, password)
            .then(v => {
                let user = v.user;
                let new_token = uuidv4();

                bookshelf.transaction(t => {
                    return new token_model({
                        'value': new_token,
                        'user_uuid': user.uuid,
                    })
                    .save(null, {
                        transacting: t
                    })
                    .catch(err => {
                        // If the account already has an API key linked...
                        if (err.errno == 1062) {
                            this.fetchAPIKey(user.uuid)
                            .then(old_api_key => {
                                reject({
                                    "message": "Votre compte a déjà généré une clé d'API.",
                                    "code": 409,
                                    "API_key": old_api_key.value,
                                });
                            });

                        // Default errors
                        } else {
                            throw err
                        }
                    });
                })
                .then(api_key => {
                    resolve({
                        "message": "La clé d'API a été généré.",
                        "code": 201,
                        "API_key": api_key,
                    })
                })
                .catch(err => {
                    console.log(err);
                    reject({
                      "message": "La génération de jeton d'API n'a pas pu être conclue.",
                      "code": 500,
                    });
                })
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    /**
     * Check if the email that was input is available for account creation.
     * 
     * @param {string} mail
     * 
     * @returns { Promise }
     *    Fulfilled: HTTP 200 if email is available.
     *    Rejected: HTTP 400-409 if email is already used.
     */
    checkIfEmailAvailable(mail) {
        return new Promise((resolve, reject) => {

            if (!(mail)) {
                reject({
                    "message": "La requête doit renseigner un email.",
                    "code": 400,
                })
            }

            if (!this.validateMail(mail)) {
                reject({
                    "message": "La requête n'est pas un email valide.",
                    "code": 400,
                })
            }

            this.getOneByEmail(mail, false)
            .then(() => {
                reject({
                    "message": "Cet email est déjà lié à un compte.",
                    "code": 409,
                })
            })
            .catch(() => {
                resolve({
                  "message": "Cet email est disponible.",
                  "code": 200,
              })
            })
        })
    }

    /**
     * Fetches the associated api_token from a user uuid.
     * 
     * @param { string } uuid
     * 
     * @returns { Promise }
     *    Fulfilled data: Queried API token object
     */
    fetchAPIKey(uuid) {
        return new Promise((resolve, reject) => {
            new token_model()
            .where({ 'user_uuid': uuid })
            .fetch()
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }));
            })
            .catch(err => {
                console.log(err);
            })
        })
    }

    /**
     * Whether a mail is correctly formed and ripe for receiving, ie: xxx@yyy.zzz.
     * 
     * @param { string } mail
     * 
     * @returns { boolean }
     */
    validateMail(mail) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(mail).toLowerCase());
    }
}

module.exports = UserRepository