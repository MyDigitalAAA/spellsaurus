'use strict'

const express = require('express')
let router = express.Router()

const connection = require('../database/connection')
const db = connection.db

// Model validation
const Validator = require('jsonschema').Validator
const v = new Validator()
const Spell = require("../models/Spell")
v.addSchema(Spell, "/SpellModel")

const getSpells = () => {
    let getSpellsPromise = new Promise((resolve, reject) => {

        let query = "SELECT DISTINCT * FROM spell"

        db.query(query, async (err, result) => {
            if (err) return reject
            if (result.length == 0) { console.log("No spell found in database") }

            // Loops over the results to fetch the associated tables
            for (let i = 0; i < result.length; i++) {
                result[i] = await buildSpell(result[i])
            }
            resolve(result)
        })
    })
    return getSpellsPromise
}

const getSpell = (id) => {
    let getSpellPromise = new Promise((resolve, reject) => {

        let query = "SELECT * FROM spell WHERE id = " + db.escapeId(id)

        db.query(query, async (err, result) => {
            if (err) return reject
            result = await buildSpell(result[0])
            resolve(result);
        })
    })
    return getSpellPromise
}

const addSpell = (spell) => {
    let addSpellPromise = new Promise((resolve, reject) => {

        // Checks if body is empty
        if(Object.keys(spell).length === 0 && spell.constructor === Object) {
            reject("You can't add an empty spell !")
        }

        // Check if model validation goes through
        if (!v.validate(spell, Spell).valid) {
            reject("Schema is not valid")
        } else {
            resolve(spell)
        }
        
    })
    return addSpellPromise
}

const updateSpell = (spell) => {
    return null;
}

const deleteSpell = (id) => {
    return null;
}

// ROUTES
// Get All
router.get('/', async (req, res, next) => {
    getSpells()
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.end(JSON.stringify(v))
    })
    .catch(err => {
        console.log(err)
        next()
    })
})

// Get One
router.get('/:id/', async (req, res, next) => {
    getSpell(req.params.id)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.end(JSON.stringify(v))
    })
    .catch(err => {
        console.log(err)
        next()
    })
})

// Add One
router.post('/', async (req, res, next) => {
    console.log(req.body)
    addSpell(req.body)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.send(JSON.stringify(v))
    })
    .catch(err => {
        console.log(err)
        next()
    })
})

// Update One
router.put('/:id/', async (req, res, next) => {

})

// Delete One
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
            let err = {
                    name: "InvalidParameterException",
                    description: "The parameter is not valid. It should be an integer."
                }
            throw err
        }
    } catch (err) {
        res.status(403).send(err)
    }
})

// SHARED FUNCTIONS
// Builds the associated infos for a given spell object
const buildSpell = async (spell) => {

    // Fetches the spell's schools
    let fetchSpellSchoolData = new Promise((resolve, reject) => {
        let query =
        "SELECT school.id, school.name " +
        "FROM spells_schools AS sc " +
        "INNER JOIN school AS school ON sc.id_school = school.id " +
        "WHERE sc.id_spell = " + db.escapeId(spell.id)

        db.query(query, (err, result) => {
            if (err) return reject
            resolve(result)
        })
    })

    // Fetches the spell's variables
    let fetchSpellVariablesData = new Promise((resolve, reject) => {
        let query =
        "SELECT variable.id, variable.description " +
        "FROM spells_variables AS sv " +
        "INNER JOIN variable AS variable ON sv.id_variable = variable.id " +
        "WHERE sv.id_spell = " + db.escapeId(spell.id)

        db.query(query, (err, result) => {
            if (err) return reject
            resolve(result)
        })
    })

    // Fetches the spell's ingredients
    let fetchSpellIngredientsData = new Promise((resolve, reject) => {
        let query =
        "SELECT ingredient.id, ingredient.name " +
        "FROM spells_ingredients AS si " +
        "INNER JOIN ingredient AS ingredient ON si.id_ingredient = ingredient.id " +
        "WHERE si.id_spell = " + db.escapeId(spell.id)

        db.query(query, (err, result) => {
            if (err) return reject
            resolve(result)
        })
    })

    // Builds the spell and returns it
    spell.schools = await fetchSpellSchoolData
    spell.variables = await fetchSpellVariablesData
    spell.ingredients = await fetchSpellIngredientsData
    return spell
}

module.exports = router