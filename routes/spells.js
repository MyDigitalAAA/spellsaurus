'use strict'

// Router
const express = require('express')
let router = express.Router()

// Connection
const connection = require('../database/connection')
const db = connection.db

// Model validation
const Validator = require('jsonschema').Validator
const v = new Validator()
const Spell = require("../models/Spell")
v.addSchema(Spell, "/SpellModel")

// Error handling
const { HttpError } = require('../models/Errors')

// ROUTES
// GET ALL ------------------
const getSpells = () => {
    let getSpellsPromise = new Promise((resolve, reject) => {

        let query = "SELECT DISTINCT * FROM spell"

        db.query(query, async (err, result) => {
            if (err) {
                reject(new HttpError(500, 'Database error'))
            } else if (result.length == 0) {
                reject(new HttpError(404, 'No spells were found'))
            } else {
                // Loops over the results to fetch the associated tables
                for (let i = 0; i < result.length; i++) {
                    result[i] = await buildSpell(result[i])
                }
                resolve(result)
            }
        })
    })
    .catch(err => { throw err })

    return getSpellsPromise
}
router.get('/', async (req, res, next) => {
    getSpells()
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.end(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(err.message)
    })
})


// GET ONE ------------------
const getSpell = (id) => {

    let getSpellPromise = new Promise((resolve, reject) => {

        let query = "SELECT * FROM spell WHERE id = " + db.escape(id)

        db.query(query, async (err, result) => {
            if (err) {
                reject(new HttpError(500, 'Error: Database error'))
            } else if (result.length == 0) {
                reject(new HttpError(404, 'Error: No ressource matching this id'))
            } else {
                result = await buildSpell(result[0])
                resolve(result);
            }
        })
    })
    .catch(err => { throw err })

    return getSpellPromise
}
router.get('/:id/', async (req, res, next) => {
    getSpell(req.params.id)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.end(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(err.message)
    })
})


// CREATE ONE ------------------
const addSpell = (spell) => {

    let addSpellPromise = new Promise((resolve, reject) => {
        // Checks if body is empty and 
        if (isEmptyObject(spell)) {
            reject(new Error("Spell cannot be nothing !"))
        } else if (!v.validate(spell, Spell).valid) {
            reject(new Error("Schema is not valid"))
        } else {
            resolve(spell)
        }
    })
    .catch(err => { throw err })

    return addSpellPromise
}
router.post('/', async (req, res, next) => {
    console.log(req.body)
    addSpell(req.body)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.send(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(err.message)
    })
})


// UPDATE ONE ------------------
const updateSpell = (spell) => {
    return null;
}
router.put('/:id/', async (req, res, next) => {

})


// DELETE ONE ------------------
const deleteSpell = (id) => {
    return null;
}
router.delete('/:id/', async (req, res, next) => {

})


// Param validation for single spell
    // (check if id is int) (could be refactored)
router.param('id', (req, res, next, id) => {
    const regex = RegExp(/^[1-9]\d*$/);
    try {
        if (regex.test(id)) {
            next()
        } else {
            throw new HttpError(403, 'Provided ID must be an integer')
        }
    } catch (err) {
        res.status(err.code).send(err.message)
    }
})

// SHARED FUNCTIONS ------------------

// Builds the associated infos for a given spell object
const buildSpell = async (spell) => {

    // Fetches the spell's schools
    let fetchSpellSchoolData = new Promise((resolve, reject) => {
        let query =
        "SELECT school.id, school.name " +
        "FROM spells_schools AS sc " +
        "INNER JOIN school AS school ON sc.id_school = school.id " +
        "WHERE sc.id_spell = " + spell.id

        db.query(query, (err, result) => {
            if (err) {
                reject(new HttpError(500, 'Error: Database error'))
            } else {
                resolve(result);
            }
        })
    })
    .catch(err => {
        res.status(403).send(err)
    })

    // Fetches the spell's variables
    let fetchSpellVariablesData = new Promise((resolve, reject) => {
        let query =
        "SELECT variable.id, variable.description " +
        "FROM spells_variables AS sv " +
        "INNER JOIN variable AS variable ON sv.id_variable = variable.id " +
        "WHERE sv.id_spell = " + spell.id

        db.query(query, (err, result) => {
            if (err) {
                reject(new HttpError(500, 'Error: Database error'))
            } else {
                resolve(result);
            }
        })
    })
    .catch(err => {
        res.status(403).send(err)
    })

    // Fetches the spell's ingredients
    let fetchSpellIngredientsData = new Promise((resolve, reject) => {
        let query =
        "SELECT ingredient.id, ingredient.name " +
        "FROM spells_ingredients AS si " +
        "INNER JOIN ingredient AS ingredient ON si.id_ingredient = ingredient.id " +
        "WHERE si.id_spell = " + spell.id

        db.query(query, (err, result) => {
            if (err) {
                reject(new HttpError(500, 'Error: Database error'))
            } else {
                resolve(result)
            }
        })
    })
    .catch(err => {
        res.status(403).send(err)
    })

    // Builds the spell and returns it
    spell.schools = await fetchSpellSchoolData
    spell.variables = await fetchSpellVariablesData
    spell.ingredients = await fetchSpellIngredientsData
    return spell
}

// Check if spell is null
const isEmptyObject = (obj) => {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        return true
    } else {
        return false
    }
}

module.exports = router
