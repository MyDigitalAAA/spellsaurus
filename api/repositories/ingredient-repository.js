'use strict'
// Bookshelf
const bookshelf = require('../database/bookshelf').bookshelf
const model = require('../models/ingredient-model')

// Model validation
const Validator = require('jsonschema').Validator
const v = new Validator()
const IngredientValidation = require("../validations/IngredientValidation")
v.addSchema(IngredientValidation, "/IngredientValidation")

// Validations
const isXSSAttempt = require('../functions').isXSSAttempt
const isEmptyObject = require('../functions').isEmptyObject

class IngredientRepository {

    constructor() {
    }

    getAll() {
        return new Promise((resolve, reject) => {
            new model()
            .fetchAll({ withRelated: ['spells'] })
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject({
                    "message": "Il n'existe aucun ingrédient disponible.",
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
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject({
                  "message": "L'ingrédient en question n'a pas pu être trouvé.",
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
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject({
                    "message": "Les sortilèges liés à cet ingrédient n'ont pas pu être récupérés.",
                    "code": 404,
                });
            })
        })
    }

    addOne(igr) {
        return new Promise((resolve, reject) => {
            // Checks if body exists and if the model fits, and throws errors if it doesn't
            if (isEmptyObject(igr)) {
                reject({
                    "message": "Le corps de la requête ne peut pas être vide.",
                    "code": 403,
                });
            } else if (!v.validate(igr, IngredientValidation).valid) {
                reject({
                    "message": `Le modèle d'ingrédient n'est pas respecté : ${v.validate(s, IngredientValidation).errors}`,
                    "code": 403,
                });
            } else if (isXSSAttempt(igr.description)) {
                reject({
                    "message": "Tentative d'injection XSS détectée, requête refusée.",
                    "code": 403,
                });
            } else {
                bookshelf.transaction(t => {
                    return new model({
                        'name': igr.name,
                        'description': igr.description,
                    }).save(null, {
                        transacting: t
                    })
                    .catch(err => {
                        throw err
                    })
                })
                .then(v => {
                    return v.load(['spells'])
                })
                .then(v => {
                    resolve(this.getOne(v.id))
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

    updateOne(id, igr) {
        return new Promise((resolve, reject) => {
            // Checks if body exists and if the model fits, and throws errors if it doesn't
            if (isEmptyObject(igr)) {
                reject({
                    "message": "Le corps de la requête ne peut pas être vide.",
                    "code": 403,
                });
            } else if (!v.validate(igr, IngredientValidation).valid) {
                reject({
                    "message": `Le modèle d'ingrédient n'est pas respecté : ${v.validate(s, IngredientValidation).errors}`,
                    "code": 403,
                });
            } else if (isXSSAttempt(igr.description)) {
                reject({
                    "message": "Tentative d'injection XSS détectée, requête refusée.",
                    "code": 403,
                });
            } else {
                new model({id: id})
                .fetch({require: true, withRelated: ['spells']})
                .then(v => {
                    bookshelf.transaction(t => {
                        return v.save({
                            'name': igr.name,
                            'description': igr.description,
                        }, {
                            method: 'update',
                            transacting: t
                        })
                        .catch(err => {
                            console.log(err)
                            throw err
                        })
                    })
                    .then(v => {
                        return v.load(['spells'])
                    })
                    .then(v => {
                        resolve(this.getOne(v.id))
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
                        "message": "L'ingrédient en question n'a pas été trouvé.",
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
            .then(v => {
                v.spells().detach()
                v.destroy()
            })
            .then(() => {
                resolve({
                    'message': 'Ingredient with ID ' + id + ' successfully deleted !'
                })
            })
            .catch(err => {
                console.log(err)
                reject({
                    "message": "L'ingrédient en question n'a pas été trouvé.",
                    "code": 404,
                });
            })
        })
    }
}

module.exports = IngredientRepository