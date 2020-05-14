'use strict'

const express = require('express')
let router = express.Router()

const connection = require('../database/connection')
const db = connection.db


const getSpells = () => {
    let fetchSpellsData = new Promise((resolve, reject) => {

        let query =
        "SELECT DISTINCT * FROM spell"

        db.query(query, async (err, result) => {
            if (err) { return reject }
            if (result.length == 0) { console.log("No spells found") }

            // Loops over the results to fetch the associated tables
            for (let i = 0; i < result.length; i++) {
                result[i] = await buildSpell(result[i])
            }
            resolve(result)
        })
    })
    return fetchSpellsData
}

const getSpell = (id) => {
    let fetchSpellData = new Promise((resolve, reject) => {

        let query = "SELECT * FROM spell WHERE id = " + id

        db.query(query, async (err, result) => {
            if (err) return reject
            result = await buildSpell(result[0])
            resolve(result);
        })
    })
    return fetchSpellData
}

// ROUTES
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
        "WHERE sc.id_spell = " + spell.id

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
        "WHERE sv.id_spell = " + spell.id

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
        "WHERE si.id_spell = " + spell.id

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