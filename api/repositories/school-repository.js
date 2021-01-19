'use strict'
// Bookshelf
const bookshelf = require('../database/bookshelf').bookshelf
const model = require('../models/school-model')

// Model validation
const Validator = require('jsonschema').Validator
const validator = new Validator()
const SchoolValidation = require("../validations/SchoolValidation")
validator.addSchema(SchoolValidation, "/SchoolValidation")

// Validations
const isXSSAttempt = require('../functions').isXSSAttempt
const isEmptyObject = require('../functions').isEmptyObject

class SchoolRepository {

    constructor() {
    }

    getAll() {
        return new Promise((resolve, reject) => {
            new model()
            .fetchAll({ withRelated: ['meta_schools'] })
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err);
                reject({
                    "message": "Il n'existe aucune école disponible.",
                    "code": 404,
                });
            })
        })
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            new model()
            .where({ 'id' : id })
            .fetch({ withRelated: ['meta_schools']})
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err);
                reject({
                    "message": "L'école en question n'a pas pu être trouvée.",
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
                console.log(err);
                reject({
                    "message": "Les sortilèges de cette école n'ont pas pu être récupérés.",
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
            } else if (!validator.validate(s, SchoolValidation).valid) {
                reject({
                    "message": `Le modèle d'école n'est pas respecté : ${validator.validate(s, SchoolValidation).errors}`,
                    "code": 403,
                });
            } else if (isXSSAttempt(s.name) || isXSSAttempt(s.description)) {
                reject({
                    "message": "Tentative d'injection XSS détectée, requête refusée.",
                    "code": 403,
                });
            } else {
                bookshelf.transaction(t => {
                    return new model({
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
                    return v.load(['meta_schools']);
                })
                .then(v => {
                    resolve(this.getOne(v.id));
                })
                .catch(err => {
                    console.log(err)
                    reject({
                        "message": "Une erreur d'insertion s'est produite.",
                        "code": 500,
                    })
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
            } else if (!validator.validate(s, SchoolValidation).valid) {
                reject({
                    "message": `Le modèle d'école n'est pas respecté : ${validator.validate(s, SchoolValidation).errors}`,
                    "code": 403,
                });
            } else if (isXSSAttempt(s.name) || isXSSAttempt(s.description)) {
                reject({
                    "message": "Tentative d'injection XSS détectée, requête refusée.",
                    "code": 403,
                });
            } else {
                new model({id: id})
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
                        reject({
                            "message": "Une erreur d'insertion s'est produite.",
                            "code": 500,
                        })
                    })
                })
                .catch(err => {
                    console.log(err);
                    reject({
                        "message": "L'école en question n'a pas été trouvée.",
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
                console.log(err);
                reject({
                    "message": "L'école en question n'a pas été trouvée.",
                    "code": 404,
                });
            })
        })
    }
}

module.exports = SchoolRepository