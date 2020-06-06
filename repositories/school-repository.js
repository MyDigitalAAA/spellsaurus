'use strict'
// Bookshelf
const bookshelf = require('../database/connection').bookshelf

const Spells = require('./spell-repository')

const MetaSchoolRepository = require('./meta-school-repository')
const MetaSchools = new MetaSchoolRepository()

// Model validation
const Validator = require('jsonschema').Validator
const v = new Validator()
const SchoolModel = require("../models/SchoolValidation")
v.addSchema(SchoolModel, "/SchoolModel")

// Validations
const regexXSS = RegExp(/<[^>]*script/)

// Error handling
const { HttpError } = require('../models/Errors')

class SchoolRepository {

    constructor() {
        this.model = bookshelf.Model.extend({
            tableName: 'school',
            spells() {
                return this.belongsToMany( Spells._model, 'spell_school', 'school_id', 'spell_id')
            },
            meta_schools() {
                return this.belongsTo( MetaSchools._model, 'meta_school_id')
            }
        })
    }

    set model(model) {
        this._model = model
    }

    get model() {
        return this._model
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this._model.forge()
            .fetchAll({ withRelated: ['meta_schools'] })
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject(new HttpError(500, "Couldn't get schools"))
            })
        })
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            this._model.forge()
            .where({ 'id' : id })
            .fetch({ withRelated: ['meta_schools']})
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject(new HttpError(500, "Couldn't get school"))
            })
        })
    }

    addOne(s) {
        return new Promise((resolve, reject) => {
            // Checks if body exists and if the model fits, and throws errors if it doesn't
            if (this.isEmptyObject(s)) {
                reject(new HttpError(403, "Error: School cannot be nothing !"))
            } else if (!v.validate(s, SchoolModel).valid) {
                reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(s, SchoolModel).errors))
            } else if (this.isXSSAttempt(s.name) || this.isXSSAttempt(s.description)) {
                reject(new HttpError(403, 'Injection attempt detected, aborting the request.'))
            } else {
                bookshelf.transaction(t => {
                    return this._model.forge({
                        'name': s.name,
                        'description': s.description,
                        'meta_school_id': s.meta_school_id,
                    }).save(null, {
                        transacting: t
                    })
                    .catch(err => {
                        throw err
                    })
                })
                .then(v => {
                    return v.load(['meta_schools'])
                })
                .then(v => {
                    resolve(this.getOne(v.id))
                })
                .catch(err => {
                    console.log(err)
                    reject(new HttpError(500, "Insert School error"))
                })
            }
        })
    }

    updateOne(id, s) {
        return new Promise((resolve, reject) => {
            // Checks if body exists and if the model fits, and throws errors if it doesn't
            if (this.isEmptyObject(s)) {
                reject(new HttpError(403, "Error: School cannot be nothing !"))
            } else if (!v.validate(s, SchoolModel).valid) {
                reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(s, SchoolModel).errors))
            } else if (this.isXSSAttempt(s.name) || this.isXSSAttempt(s.description)) {
                reject(new HttpError(403, 'Injection attempt detected, aborting the request.'))
            } else {
                this._model.forge({id: id})
                .fetch({require: true, withRelated: ['meta_schools']})
                .then(v => {
                    bookshelf.transaction(t => {
                        return v.save({
                            'name': s.name,
                            'description': s.description,
                            'meta_school_id': s.meta_school_id
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
                        return v.load(['meta_schools'])
                    })
                    .then(v => {
                        resolve(this.getOne(v.id))
                    })
                    .catch(err => {
                        console.log(err)
                        reject(new HttpError(500, "Update School error"))
                    })
                })
                .catch(err => {
                    console.log(err)
                    reject(new HttpError(404, "Couldn't get school"))
                })
            }
        })
    }

    deleteOne(id) {
        return new Promise((resolve, reject) => {
            this._model.forge()
            .where({ 'id' : id })
            .fetch({require: true, withRelated: ['spells', 'meta_schools']})
            .then(v => {

            })
            .then(() => {
                resolve({
                    'message': 'School with ID ' + id + ' successfully deleted !'
                })
            })
            .catch(err => {
                console.log(err)
                reject(new HttpError(404, "Couldn't get school"))
            })
        })
    }

    // Check if object is null
    isEmptyObject = (obj) => {
        if (Object.keys(obj).length === 0 && obj.constructor === Object) {
            return true
        } else {
            return false
        }
    }

    // Check if script injection attempt
    isXSSAttempt = (string) => {
        if (regexXSS.test(string)) {
            return true
        } else {
            return false
        }
    }
}

module.exports = SchoolRepository