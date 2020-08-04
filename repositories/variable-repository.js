'use strict'
// Bookshelf
const bookshelf = require('../database/bookshelf').bookshelf
const model = require('../models/variable-model')

// Model validation
const Validator = require('jsonschema').Validator
const v = new Validator()
const VariableValidation = require("../validations/VariableValidation")
v.addSchema(VariableValidation, "/VariableValidation")

// Validations
const isXSSAttempt = require('../functions').isXSSAttempt
const isEmptyObject = require('../functions').isEmptyObject

// Error handling
const { HttpError } = require('../validations/Errors')
class VariableRepository {

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
                reject(new HttpError(500, "Couldn't get variables"))
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
                reject(new HttpError(500, "Couldn't get variable"))
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
                reject(new HttpError(500, "Couldn't get variable"))
            })
        })
    }

    addOne(vr) {
        return new Promise((resolve, reject) => {
            // Checks if body exists and if the model fits, and throws errors if it doesn't
            if (isEmptyObject(vr)) {
                reject(new HttpError(403, "Error: Variable cannot be nothing !"))
            } else if (!v.validate(vr, VariableValidation).valid) {
                reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(vr, VariableValidation).errors))
            } else if (isXSSAttempt(vr.description)) {
                reject(new HttpError(403, 'Injection attempt detected, aborting the request.'))
            } else {
                bookshelf.transaction(t => {
                    return model.forge({
                        'description': vr.description,
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
                    reject(new HttpError(500, "Insert Variable error"))
                })
            }
        })
    }

    updateOne(id, vr) {
        return new Promise((resolve, reject) => {
            // Checks if body exists and if the model fits, and throws errors if it doesn't
            if (isEmptyObject(vr)) {
                reject(new HttpError(403, "Error: Variable cannot be nothing !"))
            } else if (!v.validate(vr, VariableValidation).valid) {
                reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(vr, VariableValidation).errors))
            } else if (isXSSAttempt(vr.description)) {
                reject(new HttpError(403, 'Injection attempt detected, aborting the request.'))
            } else {
                model.forge({id: id})
                .fetch({require: true, withRelated: ['spells']})
                .then(v => {
                    bookshelf.transaction(t => {
                        return v.save({
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
                    .then(v => {
                        return v.load(['spells'])
                    })
                    .then(v => {
                        resolve(this.getOne(v.id))
                    })
                    .catch(err => {
                        console.log(err)
                        reject(new HttpError(500, "Update Variable error"))
                    })
                })
                .catch(err => {
                    console.log(err)
                    reject(new HttpError(404, "Couldn't get variable"))
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
                    'message': 'Variable with ID ' + id + ' successfully deleted !'
                })
            })
            .catch(err => {
                console.log(err)
                reject(new HttpError(404, "Couldn't get variable"))
            })
        })
    }
}

module.exports = VariableRepository