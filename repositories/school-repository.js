'use strict'
// Bookshelf
const bookshelf = require('../database/bookshelf').bookshelf
const model = require('../models/school-model')

// Model validation
const Validator = require('jsonschema').Validator
const v = new Validator()
const SchoolValidation = require("../validations/SchoolValidation")
v.addSchema(SchoolValidation, "/SchoolValidation")

// Validations
const regexXSS = RegExp(/<[^>]*script/)

// Error handling
const { HttpError } = require('../validations/Errors')

class SchoolRepository {

    constructor() {
    }

    getAll() {
        return new Promise((resolve, reject) => {
            model.forge()
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
            model.forge()
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

    getSpellsFromOne(id) {
        return new Promise((resolve, reject) => {
            model.forge()
            .where({ 'id' : id })
            .fetch({ withRelated: ['spells', 'meta_schools']})
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
            } else if (!v.validate(s, SchoolValidation).valid) {
                reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(s, SchoolValidation).errors))
            } else if (this.isXSSAttempt(s.name) || this.isXSSAttempt(s.description)) {
                reject(new HttpError(403, 'Injection attempt detected, aborting the request.'))
            } else {
                bookshelf.transaction(t => {
                    return model.forge({
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
            } else if (!v.validate(s, SchoolValidation).valid) {
                reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(s, SchoolValidation).errors))
            } else if (this.isXSSAttempt(s.name) || this.isXSSAttempt(s.description)) {
                reject(new HttpError(403, 'Injection attempt detected, aborting the request.'))
            } else {
                model.forge({id: id})
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
            model.forge()
            .where({ 'id' : id })
            .fetch({require: true, withRelated: ['spells', 'meta_schools']})
            .then(v => {
                v.spells().detach()
                v.destroy()
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
    isEmptyObject(obj) {
        if (Object.keys(obj).length === 0 && obj.constructor === Object) {
            return true
        } else {
            return false
        }
    }

    // Check if script injection attempt
    isXSSAttempt(string) {
        if (regexXSS.test(string)) {
            return true
        } else {
            return false
        }
    }
}

module.exports = SchoolRepository