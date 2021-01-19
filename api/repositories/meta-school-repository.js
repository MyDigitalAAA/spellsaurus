'use strict'
// Bookshelf
const bookshelf = require('../database/bookshelf').bookshelf
const model = require('../models/meta-school-model')

// Model validation
const Validator = require('jsonschema').Validator
const v = new Validator()
const MetaSchoolValidation = require("../validations/MetaSchoolValidation")
v.addSchema(MetaSchoolValidation, "/MetaSchoolValidation")

// Validations
const regexXSS = RegExp(/<[^>]*script/)

class MetaSchoolRepository {

    constructor() {
    }

    getAll() {
        return new Promise((resolve, reject) => {
            new model()
            .fetchAll({ withRelated: ['schools'] })
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject({
                    "message": "Il n'existe aucune grande école disponible.",
                    "code": 404,
                });
            })
        })
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            new model()
            .where({ 'id' : id })
            .fetch({ withRelated: ['schools']})
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject({
                    "message": "La grande école en question n'a pas pu être trouvée.",
                    "code": 404,
                });
            })
        })
    }
}

module.exports = MetaSchoolRepository