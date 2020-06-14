'use strict'
// Bookshelf
const bookshelf = require('../database/bookshelf').bookshelf
const model = require('../models/spell-model')

// Model validation
const Validator = require('jsonschema').Validator
const v = new Validator()
const SpellValidation = require("../validations/SpellValidation")
v.addSchema(SpellValidation, "/SpellValidation")

// Validations
const regexXSS = RegExp(/<[^>]*script/)

// Error handling
const { HttpError } = require('../validations/Errors')

class SpellRepository {

    constructor() {
    }

    getAll() {
        return new Promise((resolve, reject) => {
            model.forge()
            .fetchAll({ withRelated: ['schools.meta_schools', 'variables', 'ingredients'] })
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject(new HttpError(500, "Couldn't get spells"))
            })
        })
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            model.forge()
            .where({ 'id' : id })
            .fetch({ withRelated: ['schools.meta_schools', 'variables', 'ingredients']})
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject(new HttpError(500, "Couldn't get spell"))
            })
        })
    }

    addOne(s) {
        return new Promise((resolve, reject) => {
            // Checks if body exists and if the model fits, and throws errors if it doesn't
            if (this.isEmptyObject(s)) {
                reject(new HttpError(403, "Error: Spell cannot be nothing !"))
            } else if (!v.validate(s, SpellValidation).valid) {
                reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(s, SpellValidation).errors))
            } else if (this.isXSSAttempt(s.name) || this.isXSSAttempt(s.description) || this.isXSSAttempt(s.cost)) {
                reject(new HttpError(403, 'Injection attempt detected, aborting the request.'))
            } else {
                bookshelf.transaction(t => {
                    return model.forge({
                        'name': s.name,
                        'description': s.description,
                        'level': s.level,
                        'charge' : s.charge,
                        'cost' : s.cost,
                        'is_ritual' : s.is_ritual
                    }).save(null, {
                        transacting: t
                    })
                    .tap(spell => {
                        return spell
                        .schools()
                        .attach(s.schools, {
                            transacting: t
                        });
                    })
                    .tap(spell => {
                        return spell
                        .variables()
                        .attach(s.variables, {
                            transacting: t
                        });
                    })
                    .tap(spell => {
                        return spell
                        .ingredients()
                        .attach(s.ingredients, {
                            transacting: t
                        });
                    })
                    .catch(err => {
                        throw err
                    })
                })
                .then(v => {
                    return v.load(['schools.meta_schools', 'variables', 'ingredients'])
                })
                .then(v => {
                    resolve(this.getOne(v.id))
                })
                .catch(err => {
                    console.log(err)
                    reject(new HttpError(500, "Insert Spell error"))
                })
            }
        })
    }

    updateOne(id, s) {
        return new Promise((resolve, reject) => {
            // Checks if body exists and if the model fits, and throws errors if it doesn't
            if (this.isEmptyObject(s)) {
                reject(new HttpError(403, "Error: Spell cannot be nothing !"))
            } else if (!v.validate(s, SpellValidation).valid) {
                reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(s, SpellValidation).errors))
            } else if (this.isXSSAttempt(s.name) || this.isXSSAttempt(s.description) || this.isXSSAttempt(s.cost)) {
                reject(new HttpError(403, 'Injection attempt detected, aborting the request.'))
            } else {
                model.forge({id: id})
                .fetch({require: true, withRelated: ['schools.meta_schools', 'variables', 'ingredients']})
                .then(v => {
                    bookshelf.transaction(t => {
                        return v.save({
                            'name': s.name,
                            'description': s.description,
                            'level': s.level,
                            'charge' : s.charge,
                            'cost' : s.cost,
                            'is_ritual' : s.is_ritual
                        }, {
                            method: 'update',
                            transacting: t
                        })
                        // Detaches AND attaches pivot tables, dw about it
                        .tap(spell => {
                            if (s.schools) {
                                let schools = spell.related('school');
                                return spell.schools().detach(schools, { transacting: t});
                            }
                            return
                        })
                        .tap(spell => {
                            if (s.variables) {
                                let variables = spell.related('variable');
                                return spell.variables().detach(variables, { transacting: t});
                            }
                            return
                        })
                        .tap(spell => {
                            if (s.ingredients) {
                                let ingredients = spell.related('ingredient');
                                return spell.ingredients().detach(ingredients, { transacting: t});
                            }
                        })
                        .tap(spell => {
                            return spell
                            .schools()
                            .attach(s.schools, {
                                transacting: t
                            });
                        })
                        .tap(spell => {
                            return spell
                            .variables()
                            .attach(s.variables, {
                                transacting: t
                            });
                        })
                        .tap(spell => {
                            return spell
                            .ingredients()
                            .attach(s.ingredients, {
                                transacting: t
                            });
                        })
                        .catch(err => {
                            console.log(err)
                            throw err
                        })
                    })
                    .then(v => {
                        return v.load(['schools.meta_schools', 'variables', 'ingredients'])
                    })
                    .then(v => {
                        resolve(this.getOne(v.id))
                    })
                    .catch(err => {
                        console.log(err)
                        reject(new HttpError(500, "Update Spell error"))
                    })
                })
                .catch(err => {
                    console.log(err)
                    reject(new HttpError(404, "Couldn't get spell"))
                })
            }          
        })
    }

    deleteOne(id) {
        return new Promise((resolve, reject) => {
            model.forge()
            .where({ 'id' : id })
            .fetch({require: true, withRelated: ['schools.meta_schools', 'variables', 'ingredients']})
            .then(v => {
                v.schools().detach()
                v.variables().detach()
                v.ingredients().detach()
                v.destroy()
            })
            .then(() => {
                resolve({
                    'message': 'Spell with ID ' + id + ' successfully deleted !'
                })
            })
            .catch(err => {
                console.log(err)
                reject(new HttpError(404, "Couldn't get spell"))
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

module.exports = SpellRepository