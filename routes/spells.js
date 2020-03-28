'use strict'

const express = require('express')
let router = express.Router()

const connection = require('../database/connection')
const db = connection.db

const getSpells = (params) => {
    let fetchSpellsData = new Promise((resolve, reject) => {

        let query =
        "SELECT DISTINCT * " +
        "FROM spell " +
        "WHERE 1 = 1 "

        // Checks if the params object has items
        if (!(Object.keys(params).length === 0 && params.constructor === Object)) {
            if (params.id) {
                query += "AND id = " + params.id + " "
            }
            if (params.name) {
                query += "AND name = " + params.name + " "
            }
        }

        db.query(query, async (err, result) => {
            if (err) { return reject }
            if (result.length == 0) { console.log("No spells found") }

            // Loops over the results to fetch the associated tables
            for (let i = 0; i < result.length; i++) {

                let currentSpell_ID = i + 1
                
                // Fetches the spell's schools
                let fetchSpellSchoolData = new Promise((resolve, reject) => {
                    let query =
                    "SELECT school.name, school.description " +
                    "FROM spells_schools AS sc " +
                    "INNER JOIN school AS school ON sc.id_school = school.id " +
                    "WHERE sc.id_spell = " + currentSpell_ID
                
                    db.query(query, (err, result) => {
                        if (err) return reject
                        resolve(result)
                    })
                })

                // Fetches the spell's variables
                let fetchSpellVariablesData = new Promise((resolve, reject) => {
                    let query =
                    "SELECT variable.description " +
                    "FROM spells_variables AS sv " +
                    "INNER JOIN variable AS variable ON sv.id_variable = variable.id " +
                    "WHERE sv.id_spell = " + currentSpell_ID
                
                    db.query(query, (err, result) => {
                        if (err) console.log(err)
                        resolve(result)
                    })
                })

                // Fetches the spell's ingredients
                let fetchSpellIngredientsData = new Promise((resolve, reject) => {
                    let query =
                    "SELECT ingredient.name " +
                    "FROM spells_ingredients AS si " +
                    "INNER JOIN ingredient AS ingredient ON si.id_ingredient = ingredient.id " +
                    "WHERE si.id_spell = " + currentSpell_ID
                
                    db.query(query, (err, result) => {
                        if (err) console.log(err)
                        resolve(result)
                    })
                })

                result[i].schools = await fetchSpellSchoolData
                result[i].variables = await fetchSpellVariablesData
                result[i].ingredients = await fetchSpellIngredientsData

            }
            resolve(result)
        })
    })

    return fetchSpellsData
}

router
.get('/', async (req, res, next) => {
    getSpells(req.query)
    .then(v => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({spells : v}))
    })
    .catch(err => {
        console.log(err)
        next()
    })
})


module.exports = router