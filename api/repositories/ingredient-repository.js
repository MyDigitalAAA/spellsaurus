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

// Error handling
const { HttpError } = require('../validations/Errors')

class IngredientRepository {

    constructor() {
    }

    getAll() {
        return new Promise((resolve, reject) => {
            model.forge()
            .fetchAll({ withRelated: ['spells'] })
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject(new HttpError(500, "Couldn't get ingredients"))
            })
        })
    }

    
    getOne(id) {
        return new Promise((resolve, reject) => {
            model.forge()
            .where({ 'id' : id })
            .fetch({ withRelated: ['spells']})
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject(new HttpError(500, "Couldn't get ingredient"))
            })
        })
    }

    getSpellsFromOne(id) {
        return new Promise((resolve, reject) => {
            model.forge()
            .where({ 'id' : id })
            .fetch({ withRelated: ['spells', 'spells.schools', 'spells.variables', 'spells.ingredients', 'spells.schools.meta_schools']})
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject(new HttpError(500, "Couldn't get ingredient"))
            })
        })
    }

    addOne(igr) {
        return new Promise((resolve, reject) => {
            // Checks if body exists and if the model fits, and throws errors if it doesn't
            if (isEmptyObject(igr)) {
                reject(new HttpError(403, "Error: Ingredient cannot be nothing !"))
            } else if (!v.validate(igr, IngredientValidation).valid) {
                reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(igr, IngredientValidation).errors))
            } else if (isXSSAttempt(igr.description)) {
                reject(new HttpError(403, 'Injection attempt detected, aborting the request.'))
            } else {
                bookshelf.transaction(t => {
                    return model.forge({
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
                    reject(new HttpError(500, "Insert Ingredient error"))
                })
            }
        })
    }

    updateOne(id, igr) {
        return new Promise((resolve, reject) => {
            // Checks if body exists and if the model fits, and throws errors if it doesn't
            if (isEmptyObject(igr)) {
                reject(new HttpError(403, "Error: Ingredient cannot be nothing !"))
            } else if (!v.validate(igr, IngredientValidation).valid) {
                reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(igr, IngredientValidation).errors))
            } else if (isXSSAttempt(igr.description)) {
                reject(new HttpError(403, 'Injection attempt detected, aborting the request.'))
            } else {
                model.forge({id: id})
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
                        reject(new HttpError(500, "Update Ingredient error"))
                    })
                })
                .catch(err => {
                    console.log(err)
                    reject(new HttpError(404, "Couldn't get ingredient"))
                })
            }
        })
    }

    deleteOne(id) {
        return new Promise((resolve, reject) => {
            model.forge()
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
                reject(new HttpError(404, "Couldn't get ingredient"))
            })
        })
    }
}

module.exports = IngredientRepository