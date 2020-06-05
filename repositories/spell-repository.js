'use strict'

// Bookshelf
const bookshelf = require('../database/connection').bookshelf

const SchoolRepository = require('./school-repository')
const Schools = new SchoolRepository()

const IngredientRepository = require('./ingredient-repository')
const Ingredients = new IngredientRepository()

const VariableRepository = require('./variable-repository')
const Variables = new VariableRepository()

// Model validation
const Validator = require('jsonschema').Validator
const v = new Validator()
const SpellModel = require("../models/SpellValidation")
v.addSchema(SpellModel, "/SpellModel")

// Validations
const regexXSS = RegExp(/<[^>]*script/)

// Error handling
const { HttpError } = require('../models/Errors')

class SpellRepository {

    constructor() {
        this.model = bookshelf.Model.extend({
            tableName: 'spell',
            schools() {
                return this.belongsToMany( Schools._model, 'spell_school', 'spell_id', 'school_id' )
            },
            variables() {
                return this.belongsToMany( Variables._model, 'spell_variable', 'spell_id', 'variable_id' )
            },
            ingredients() {
                return this.belongsToMany( Ingredients._model, 'spell_ingredient', 'spell_id', 'ingredient_id' )
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
            this._model.forge()
            .where({ 'id' : id })
            .fetch({ withRelated: ['schools.meta_schools', 'variables', 'ingredients'] })
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
            } else if (!v.validate(s, SpellModel).valid) {
                reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(s, SpellModel).errors))
            } else if (this.isXSSAttempt(s.name) || this.isXSSAttempt(s.description) || this.isXSSAttempt(s.cost)) {
                reject(new HttpError(403, 'Injection attempt detected, aborting the request.'))
            } else {
                bookshelf.transaction(t => {
                    return this._model.forge({
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
                    reject(new HttpError(500, "Insert error"))
                })
            }
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

module.exports = SpellRepository