'use strict'
// Bookshelf
const bookshelf = require('../database/bookshelf').bookshelf
const model = require('../models/variable-model')

// Model validation
const Validator = require('jsonschema').Validator
const validator = new Validator()
const VariableValidation = require("../validations/VariableValidation")
validator.addSchema(VariableValidation, "/VariableValidation")

// Validations
const isXSSAttempt = require('../functions').isXSSAttempt
const isEmptyObject = require('../functions').isEmptyObject

class VariableRepository {

    constructor() {
    }
    
    getAll() {
        return new Promise((resolve, reject) => {
            new model()
            .fetchAll({ withRelated: ['spells'] })
            .then(fetchedUsers => {
                resolve(fetchedUsers.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject({
                    "message": "Il n'existe aucune variable disponible.",
                    "code": 404,
                });
            })
        })
    }

    
    getOne(id) {
        return new Promise((resolve, reject) => {
            new model()
            .where({ 'id' : id })
            .fetch({ withRelated: ['spells']})
            .then(fetchedUser => {
                resolve(fetchedUser.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject({
                    "message": "La variable en question n'a pas pu être trouvée.",
                    "code": 404,
                });
            })
        })
    }

    getSpellsFromOne(id) {
        return new Promise((resolve, reject) => {
            new model()
            .where({ 'id' : id })
            .fetch({ withRelated: ['spells', 'spells.schools', 'spells.variables', 'spells.ingredients', 'spells.schools.meta_schools']})
            .then(fetchedSpells => {
                resolve(fetchedSpells.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject({
                    "message": "Les sortilèges liés à cette variable n'ont pas pu être récupérés.",
                    "code": 404,
                });
            })
        })
    }

    addOne(vr) {
        return new Promise((resolve, reject) => {
            // Checks if body exists and if the model fits, and throws errors if it doesn't
            if (isEmptyObject(vr)) {
                reject({
                    "message": "Le corps de la requête ne peut pas être vide.",
                    "code": 403,
                });
            } else if (!validator.validate(vr, VariableValidation).valid) {
                reject({
                    "message": `Le modèle de variable n'est pas respecté : ${validator.validate(s, VariableValidation).errors}`,
                    "code": 403,
                });
            } else if (isXSSAttempt(vr.description)) {
                reject({
                    "message": "Tentative d'injection XSS détectée, requête refusée.",
                    "code": 403,
                });
            } else {
                bookshelf.transaction(t => {
                    return new model({
                        'description': vr.description,
                    }).save(null, {
                        transacting: t
                    })
                    .catch(err => {
                        throw err
                    })
                })
                .then(newVariableRaw => {
                    return newVariableRaw.load(['spells'])
                })
                .then(newVariable => {
                    resolve(this.getOne(newVariable.id))
                })
                .catch(err => {
                    console.log(err)
                    reject({
                        "message": "Une erreur d'insertion s'est produite.",
                        "code": 500,
                    });
                })
            }
        })
    }

    updateOne(id, vr) {
        return new Promise((resolve, reject) => {
            // Checks if body exists and if the model fits, and throws errors if it doesn't
            if (isEmptyObject(vr)) {
                reject({
                    "message": "Le corps de la requête ne peut pas être vide.",
                    "code": 403,
                });
            } else if (!validator.validate(vr, VariableValidation).valid) {
                reject({
                    "message": `Le modèle de variable n'est pas respecté : ${validator.validate(s, VariableValidation).errors}`,
                    "code": 403,
                });
            } else if (isXSSAttempt(vr.description)) {
                reject({
                    "message": "Tentative d'injection XSS détectée, requête refusée.",
                    "code": 403,
                });
            } else {
                new model({id: id})
                .fetch({require: true, withRelated: ['spells']})
                .then(oldVariable => {
                    bookshelf.transaction(t => {
                        return oldVariable.save({
                            'description': vr.description,
                        }, {
                            method: 'update',
                            transacting: t
                        })
                        .catch(err => {
                            console.log(err)
                            throw err
                        })
                    })
                    .then(newVariableRaw => {
                        return newVariableRaw.load(['spells'])
                    })
                    .then(newVariable => {
                        resolve(this.getOne(newVariable.id))
                    })
                    .catch(err => {
                        console.log(err)
                        reject({
                            "message": "Une erreur d'insertion s'est produite.",
                            "code": 500,
                        });
                    })
                })
                .catch(err => {
                    console.log(err)
                    reject({
                        "message": "La variable en question n'a pas été trouvée.",
                        "code": 404,
                    });
                })
            }
        })
    }

    deleteOne(id) {
        return new Promise((resolve, reject) => {
            new model()
            .where({ 'id' : id })
            .fetch({require: true, withRelated: ['spells']})
            .then(oldVariable => {
                oldVariable.spells().detach()
                oldVariable.destroy()
            })
            .then(() => {
                resolve({
                    'message': 'Variable with ID ' + id + ' successfully deleted !'
                })
            })
            .catch(err => {
                console.log(err)
                reject({
                    "message": "La variable en question n'a pas été trouvée.",
                    "code": 404,
                });
            })
        })
    }
}

module.exports = VariableRepository