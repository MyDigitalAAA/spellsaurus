'use strict'

const express = require('express')
let router = express.Router()

const connection = require('../database/connection')
const db = connection.db

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
            if (err) console.log(err)
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
            if (err) console.log(err)
            resolve(result)
        })
    })

    // Builds the spell and returns it
    spell.schools = await fetchSpellSchoolData
    spell.variables = await fetchSpellVariablesData
    spell.ingredients = await fetchSpellIngredientsData
    return spell
}

const getSpells = () => {
    let fetchSpellsData = new Promise((resolve, reject) => {

        let query =
        "SELECT DISTINCT * " +
        "FROM spell "

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

        let query =
        "SELECT FROM spell where id = " + id

        db.query(query, async (err, result) => {
            if (err) { return reject }
            resolve(result);
        })
    })
    return fetchSpellData
}

// ROUTES
// ALL SPELLS METHODS
// Router
router.get('/', async (req, res, next) => {
    getSpells(req.query)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.end(JSON.stringify(v))
    })
    .catch(err => {
        console.log(err)
        next()
    })
})

// ONE SPELL METHODS
// Regex for param validation
const regex = RegExp(/^[1-9]\d*$/);

// Param validation
router.param('id', (req, res, next, id) => {
    if (regex.test(id)) {
        next()
    } else {
        res.status(403).send('The id parameter should be an integer.')
    }
})

// Router
router.get('/:id/', async (req, res, next) => {
    console.log("id")
})

module.exports = router