'use strict'
// Bookshelf
const bookshelf = require('../database/bookshelf').bookshelf
const model = require('../models/variable-model')

// Model validation
const Validator = require('jsonschema').Validator
const v = new Validator()
const VariableValidation = require("../validations/VariableValidation")
v.addSchema(VariableValidation, "/VariableValidation")

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
}

module.exports = VariableRepository