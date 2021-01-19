'use strict'
// Bookshelf
const bookshelf = require('../database/bookshelf').bookshelf
const model = require('../models/spell-model')

// Model validation
const Validator = require('jsonschema').Validator
const validator = new Validator()
const SpellValidation = require("../validations/SpellValidation")
validator.addSchema(SpellValidation, "/SpellValidation")

// Validations
const isXSSAttempt = require('../functions').isXSSAttempt
const isEmptyObject = require('../functions').isEmptyObject

class SpellRepository {

    constructor() {
    }

    getAll(name, description, level, charge, cost, ritual) {
        return new Promise((resolve, reject) => {

            let query = new model();

            if (name) { query.where('name', 'like', `%${name}%`) }
            if (description) { query.where('description', 'like', `%${description}%`) }
            if (level) { query.where({ 'level' : level }) }
            if (charge) { query.where({ 'charge' : charge }) }
            if (cost) { query.where({ 'cost' : cost }) }
            if (ritual) { query.where({ 'is_ritual' : ritual }) }

            query.fetchAll({ withRelated: [ 'schools.meta_schools', 'variables', 'ingredients', 'author' ] })
            .then(fetchedSpells => {
                resolve(fetchedSpells.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err);
                reject({
                    "message": "Il n'existe aucun sortilège disponible.",
                    "code": 404,
                });
            })
        })
    }

    getAllPublic(name, description, level, charge, cost, ritual) {
        return new Promise((resolve, reject) => {

            let query = new model().where({ 'public' : 1 })

            if (name) { query.where('name', 'like', `%${name}%`) }
            if (description) { query.where('description', 'like', `%${description}%`) }
            if (level) { query.where({ 'level' : level }) }
            if (charge) { query.where({ 'charge' : charge }) }
            if (cost) { query.where({ 'cost' : cost }) }
            if (ritual) { query.where({ 'is_ritual' : ritual }) }

            query.fetchAll({ withRelated: [ 'schools.meta_schools', 'variables', 'ingredients', 'author' ] })
            .then(fetchedSpells => {
                resolve(fetchedSpells.toJSON({ omitPivot: true }));
            })
            .catch(err => {
                console.log(err);
                reject({
                    "message": "Il n'existe aucun sortilège disponible.",
                    "code": 404,
                });
            })
        })
    }

    getPage(page) {
        return new Promise((resolve, reject) => {
            new model()
            .where({ 'public' : 1 })
            .fetchPage({
                pageSize: 20,
                page: page,
                withRelated: [ 'schools.meta_schools', 'variables', 'ingredients', 'author' ],
            })
            .then(fetchedSpellPage => {
                resolve(fetchedSpellPage.toJSON({ omitPivot: true }))
            })
            .catch(err => {
              console.log(err);
              reject({
                  "message": "La page de sortilèges n'a pas pu être chargée",
                  "code": 404,
              });
            })
        })
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            new model()
            .where({ 'id' : id })
            .fetch({ withRelated: [ 'schools.meta_schools', 'variables', 'ingredients', 'author' ]})
            .then(fetchedSpell => {
                resolve(fetchedSpell.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err);
                reject({
                    "message": "Le sortilège en question n'a pas été trouvé.",
                    "code": 404,
                });
            })
        })
    }

    addOne(s) {
        return new Promise((resolve, reject) => {
            // Checks if body exists and if the model fits, and throws errors if it doesn't
            if (isEmptyObject(s)) {
                reject({
                    "message": "Le corps de la requête ne peut pas être vide.",
                    "code": 403,
                });
            } else if (!validator.validate(s, SpellValidation).valid) {
                reject({
                  "message": `Le modèle de sortilège n'est pas respecté : ${validator.validate(s, SpellValidation).errors}`,
                  "code": 403,
                });
            } else if (isXSSAttempt(s.name) || isXSSAttempt(s.description) || isXSSAttempt(s.cost)) {
                reject({
                    "message": "Tentative d'injection XSS détectée, requête refusée.",
                    "code": 403,
                });
            } else {
                bookshelf.transaction(t => {
                    return new model({
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
                        console.log(err);
                        reject({
                            "message": "Un attributs du sortilège a provoqué une erreur d'insertion.",
                            "code": 500,
                        });
                    })
                })
                .then(newSpellRaw => {
                    return newSpellRaw.load([ 'schools.meta_schools', 'variables', 'ingredients', 'author' ])
                })
                .then(newSpell => {
                    resolve(this.getOne(newSpell.id))
                })
                .catch(err => {
                    console.log(err);
                    reject({
                        "message": "Le sortilège n'a pas pu être ajouté.",
                        "code": 500,
                    });
                })
            }
        })
    }

    updateOne(id, s) {
        return new Promise((resolve, reject) => {
            // Checks if body exists and if the model fits, and throws errors if it doesn't
            if (isEmptyObject(s)) {
                reject({
                    "message": "Le corps de la requête ne peut pas être vide.",
                    "code": 403,
                });
            } else if (!validator.validate(s, SpellValidation).valid) {
                reject({
                    "message": `Le modèle de sortilège n'est pas respecté : ${validator.validate(s, SpellValidation).errors}`,
                    "code": 403,
                });
            } else if (isXSSAttempt(s.name) || isXSSAttempt(s.description) || isXSSAttempt(s.cost)) {
                reject({
                    "message": "Tentative d'injection XSS détectée, requête refusée.",
                    "code": 403,
                });
            } else {
                new model({ id: id })
                .fetch({require: true, withRelated: [ 'schools.meta_schools', 'variables', 'ingredients', 'author' ]})
                .then(oldSpell => {
                    bookshelf.transaction(t => {
                        return oldSpell.save({
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
                        .tap(newSpell => {
                            if (s.schools) {
                                let schools = newSpell.related('school');
                                return newSpell.schools().detach(schools, { transacting: t});
                            }
                        })
                        .tap(newSpell => {
                            if (s.variables) {
                                let variables = newSpell.related('variable');
                                return newSpell.variables().detach(variables, { transacting: t});
                            }
                        })
                        .tap(newSpell => {
                            if (s.ingredients) {
                                let ingredients = newSpell.related('ingredient');
                                return newSpell.ingredients().detach(ingredients, { transacting: t});
                            }
                        })
                        .tap(newSpell => {
                            return newSpell
                            .schools()
                            .attach(s.schools, {
                                transacting: t
                            });
                        })
                        .tap(newSpell => {
                            return newSpell
                            .variables()
                            .attach(s.variables, {
                                transacting: t
                            });
                        })
                        .tap(newSpell => {
                            return newSpell
                            .ingredients()
                            .attach(s.ingredients, {
                                transacting: t
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            reject({
                                "message": "Un attributs du sortilège a provoqué une erreur d'insertion.",
                                "code": 500,
                            })
                        })
                    })
                    .then(newSpellRaw => {
                        return newSpellRaw.load([ 'schools.meta_schools', 'variables', 'ingredients', 'author' ]);
                    })
                    .then(newSpell => {
                        resolve(this.getOne(newSpell.id));
                    })
                    .catch(err => {
                        console.log(err);
                        reject({
                            "message": "Une erreur de chargement est survenue.",
                            "code": 500,
                        });
                    })
                })
                .catch(err => {
                    console.log(err);
                    reject({
                        "message": "Le sortilège en question n'a pas été trouvé.",
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
            .fetch({require: true, withRelated: [ 'schools.meta_schools', 'variables', 'ingredients', 'author' ]})
            .then(oldSpell => {
                oldSpell.schools().detach();
                oldSpell.variables().detach();
                oldSpell.ingredients().detach();
                oldSpell.destroy();
            })
            .then(() => {
                resolve({
                    "message": `Le sortilège #${id} a été supprimé avec succès.`,
                    "code": 200,
                });
            })
            .catch(err => {
                console.log(err);
                reject({
                    "message": "Le sortilège en question n'a pas été trouvé.",
                    "code": 404,
                });
            })
        })
    }
}

module.exports = SpellRepository