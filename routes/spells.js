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
    return new Promise((resolve, reject) => {

        let query = "SELECT DISTINCT * FROM spell"

        db.query(query, async (err, result) => {
            if (err) {
                reject(new HttpError(500, 'Error: Database error'))
            } else if (result.length == 0) {
                reject(new HttpError(404, 'Error: No spells were found'))
            }

            // Loops over the results to fetch the associated tables
            for (let i = 0; i < result.length; i++) {
                try {
                    result[i] = await buildSpell(result[i])
                    resolve(result)
                } catch (err) {
                    reject(err)
                }
            }
        })
    })
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
    return new Promise((resolve, reject) => {

        let query = "SELECT * FROM spell WHERE id = " + db.escape(id)

        db.query(query, async (err, result) => {
            if (err) {
                reject(new HttpError(500, 'Error: Database error'))
            }
            try {
                result = buildSpell(result[0])
                resolve(result)
            } catch (err) {
                reject(err)
            }
        })
    })
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
const addSpell = (s) => {
    return new Promise((resolve, reject) => {

        // Checks if body exists and if the model fits, and throws errors if it doesn't
        if (isEmptyObject(s)) {
            reject(new HttpError(403, "Error: Spell cannot be nothing !"))
        } else if (!v.validate(s, Spell).valid) {
            reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(s, Spell).errors))
        }

        let query =
            'INSERT INTO spell (name, description'

            if (s.level != undefined) { query += ', level' }
            if (s.charge != undefined) { query += ', charge' }
            if (s.cost != undefined) { query += ', cost' }
            if (s.is_ritual != undefined) { query += ', is_ritual' }

            query += `) VALUES (${db.escape(s.name)}, ${db.escape(s.description)}`

            if (s.level != undefined) { query += `, ${s.level}` }
            if (s.charge != undefined) { query += `, ${s.charge}` }
            if (s.cost != undefined) { query += `, ${db.escape(s.cost)}` }
            if (s.is_ritual != undefined) { query += `, ${s.is_ritual}` }

            query += ')'

        db.query(query, async (err, result) => {
            if (err) {
                reject(new HttpError(500, 'Error: Database error'))
            }
            console.log(`Spell "${s.name}" inserted with ID ${result.insertId}, affecting ${result.affectedRows} row(s)`)
            resolve(result);
        })
    })
}
router.post('/', async (req, res, next) => {
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
const updateSpell = (s, id) => {
    return new Promise((resolve, reject) => {

        // Check if spell exists
        // try {
        //     let old_spell = getSpell(id).catch(err => { throw err })
        // } catch (err) {
        //     reject(err)
        // }

        // Checks if body exists and if the model fits, and throws errors if it doesn't
        if (isEmptyObject(s)) {
            reject(new HttpError(403, "Error: Spell cannot be nothing !"))
        } else if (!v.validate(s, Spell).valid) {
            reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(s, Spell).errors))
        }

        let query =
            `UPDATE spell SET name = "test spell", description = "test", level = 999, charge = 999, cost = "cher", is_ritual = false WHERE id = ${db.escape(id)}`

        db.query(query, async (err, result) => {
            if (err) {
                throw new HttpError(500, 'Error: Database error')
            } else {
                console.log(`Spell "${s.name}" updated at ID ${result.insertId}, affecting ${result.affectedRows} row(s)`)
                resolve(result);
            }
        })
    })
}
router.put('/:id/', async (req, res, next) => {
    updateSpell(req.body, req.params.id)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.send(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(err.message)
    })
})


// DELETE ONE ------------------
const deleteSpell = (id) => {
    return new Promise((resolve, reject) => {

    })
}
router.delete('/:id/', async (req, res, next) => {
    deleteSpell(req.body)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.send(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(err.message)
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
            throw new HttpError(403, 'Error: Provided ID must be an integer')
        }
    } catch (err) {
        res.status(err.code).send(err.message)
    }
})

// SHARED FUNCTIONS ------------------

// Builds the associated infos for a given spell object
const buildSpell = async (spell) => {

    // Fetches the spell's schools
    let fetchSpellSchoolData = (s) => {
        return new Promise((resolve, reject) => {

            if (s == undefined) { reject(new HttpError(404, "Error: No spells matching this ID"))}

            let query =
            "SELECT school.id, school.name " +
            "FROM spells_schools AS sc " +
            "INNER JOIN school AS school ON sc.id_school = school.id " +
            "WHERE sc.id_spell = " + s.id
    
            db.query(query, (err, result) => {
                if (err) {
                    reject(new HttpError(500, 'Error: Database error'))
                } else {
                    s.schools = result
                    resolve(s)
                }
            })
        })
    }

    // Fetches the spell's variables
    let fetchSpellVariablesData = (s) => {
        return new Promise((resolve, reject) => {

            if (s == undefined) { reject(new HttpError(404, "Error: No spells matching this ID"))}

            let query =
            "SELECT variable.id, variable.description " +
            "FROM spells_variables AS sv " +
            "INNER JOIN variable AS variable ON sv.id_variable = variable.id " +
            "WHERE sv.id_spell = " + s.id
    
            db.query(query, (err, result) => {
                if (err) {
                    reject(new HttpError(500, 'Error: Database error'))
                } else {
                    s.variables = result
                    resolve(s)
                }
            })
        })
    }

    // Fetches the spell's ingredients
    let fetchSpellIngredientsData = (s) => {
        return new Promise((resolve, reject) => {

            if (s == undefined) { reject(new HttpError(404, "Error: No spells matching this ID"))}

            let query =
            "SELECT ingredient.id, ingredient.name " +
            "FROM spells_ingredients AS si " +
            "INNER JOIN ingredient AS ingredient ON si.id_ingredient = ingredient.id " +
            "WHERE si.id_spell = " + s.id
    
            db.query(query, (err, result) => {
                if (err) {
                    reject(new HttpError(500, 'Error: Database error'))
                } else {
                    s.ingredients = result
                    resolve(s)
                }
            })
        })
    }

    // Builds the spell and returns it
    let s = await fetchSpellSchoolData(spell)
    .then(s => { return fetchSpellVariablesData(s) })
    .then(s => { return fetchSpellIngredientsData(s) })
    .catch(err => {
        throw err
    })

    return s
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
