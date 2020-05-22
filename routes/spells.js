'use strict'

// Router
const express = require('express')
let router = express.Router()

// Connection
const connection = require('../database/connection')
const db = connection.db

// Validations
const regexInt = RegExp(/^[1-9]\d*$/)
const regexXSS = RegExp(/<[^>]*script/)

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
                reject(new HttpError(500, 'Database error'))
            } else if (result.length == 0) {
                reject(new HttpError(404, 'No spells were found'))
            }

            // Loops over the results to fetch the associated tables
            for (let i = 0; i < result.length; i++) {
                try {
                    result[i] = await buildSpell(result[i])
                } catch (err) {
                    reject(err)
                }
            }
            resolve(result)
        })
    })
    .catch(err => {
        throw err
    })
}
router.get('/', async (req, res) => {
    getSpells()
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.end(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(JSON.stringify(
            {
                "error": err.message,
                "code": err.code
            })
        )
    })
})


// GET ONE ------------------
const getSpell = (id) => {
    return new Promise((resolve, reject) => {

        let query = "SELECT * FROM spell WHERE id = " + db.escape(id)

        db.query(query, async (err, result) => {
            if (err) {
                reject(new HttpError(500, 'Database error'))
            }
            try {
                result = buildSpell(result[0])
                resolve(result)
            } catch (err) {
                reject(err)
            }
        })
    })
    .catch(err => {
        throw err
    })
}
router.get('/:id/', async (req, res) => {
    getSpell(req.params.id)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.end(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(JSON.stringify(
            {
                "error": err.message,
                "code": err.code
            })
        )
    })
})


// CREATE ONE ------------------
const addSpell = (s) => {
    return new Promise(async (resolve, reject) => {

        // Checks if body exists and if the model fits, and throws errors if it doesn't
        if (isEmptyObject(s)) {
            reject(new HttpError(403, "Error: Spell cannot be nothing !"))
        } else if (!v.validate(s, Spell).valid) {
            reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(s, Spell).errors))
        } else if (isXSSAttempt(s.name) || isXSSAttempt(s.description) || isXSSAttempt(s.cost)) {
            reject(new HttpError(403, 'Injection attempt detected, aborting the request.'))
        } else {
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
                    reject(new HttpError(500, 'Database error'))
                }
                console.log(`Inserted "${s.name}" with ID ${result.insertId}, affecting ${result.affectedRows} row(s)`)

                const new_spell_id = result.insertId

                let addSchoolsData = () => {
                    return new Promise((resolve, reject) => {
                        if (s.schools != undefined) {
                            if (s.schools.length > 0) {
                                for (let i = 0; i < s.schools.length; i++) {
                                    if (!regexInt.test(s.schools[i].id)) {
                                        reject(new HttpError(403, 'Query error - School ID should be an integer !'))
                                    }
                
                                    let insert_schools_query = `INSERT INTO spells_schools (id_spell, id_school) VALUES (${new_spell_id}, ${s.schools[i].id})`
        
                                    db.query(insert_schools_query, async (err, result) => {
                                        if (err) {
                                            reject(new HttpError(500, 'Database error - No schools matching this ID'))
                                        } else {
                                            console.log(`Associated school ID ${s.schools[i].id} to spell ID ${new_spell_id}, affecting ${result.affectedRows} row(s)`)
                                            resolve()
                                        }
                                    })
                                }
                            } else {
                                resolve()
                            }
                        } else {
                            resolve()
                        }
                    })
                }

                let addVariablesData = () => {
                    return new Promise((resolve, reject) => {
                        if (s.variables != undefined) {
                            if (s.variables.length > 0) {
                                for (let i = 0; i < s.variables.length; i++) {
                                    if (!regexInt.test(s.variables[i].id)) {
                                        reject(new HttpError(403, 'Query error - Variable ID should be an integer !'))
                                    }
                
                                    let insert_variables_query = `INSERT INTO spells_variables (id_spell, id_variable) VALUES (${new_spell_id}, ${s.variables[i].id})`
                                    db.query(insert_variables_query, async (err, result) => {
                                        if (err) {
                                            reject(new HttpError(500, 'Database error - No variables matching this ID'))
                                        } else {
                                            console.log(`Associated variable ID ${s.variables[i].id} to spell ID ${new_spell_id}, affecting ${result.affectedRows} row(s)`)
                                            resolve()
                                        }
                                    })
                                }
                            } else {
                                resolve()
                            }
                        } else {
                            resolve()
                        }
                    })
                }

                let addIngredientsData = () => {
                    return new Promise((resolve, reject) => {
                        if (s.ingredients != undefined) {
                            if (s.ingredients.length > 0) {
                                for (let i = 0; i < s.ingredients.length; i++) {
                                    if (!regexInt.test(s.ingredients[i].id)) {
                                        reject(new HttpError(403, 'Query error - Ingredient ID should be an integer !'))
                                    }
                
                                    let insert_ingredients_query = `INSERT INTO spells_ingredients (id_spell, id_ingredient) VALUES (${new_spell_id}, ${s.ingredients[i].id})`
                                    db.query(insert_ingredients_query, async (err, result) => {
                                        if (err) {
                                            reject(new HttpError(500, 'Database error - No ingredients matching this ID'))
                                        } else {
                                            console.log(`Associated ingredient ID ${s.ingredients[i].id} to spell ID ${new_spell_id}, affecting ${result.affectedRows} row(s)`)
                                            resolve()
                                        }
                                    })
                                }
                            } else {
                                resolve()
                            }
                        } else {
                            resolve()
                        }
                    })
                }

                Promise.all([addSchoolsData(), addVariablesData(), addIngredientsData()])
                .then(v => {
                    resolve(getSpell(new_spell_id))
                })
                .catch(err => {
                    reject(err)
                })
            })
        }
    }).catch(err => {
        throw err
    })
}
router.post('/', async (req, res) => {
    addSpell(req.body)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.send(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(JSON.stringify(
            {
                "error": err.message,
                "code": err.code
            })
        )
    })
})


// UPDATE ONE ------------------
const updateSpell = (s, id) => {
    return new Promise( async (resolve, reject) => {

        // Check if spell exists
        let old_spell = await getSpell(id)
        .catch(err => {
            reject(err)
        })

        // Checks if body exists and if the model fits, and throws errors if it doesn't
        if (isEmptyObject(s)) {
            reject(new HttpError(403, "Error: Spell cannot be nothing !"))
        } else if (!v.validate(s, Spell).valid) {
            reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(s, Spell).errors))
        } else if (isXSSAttempt(s.name) || isXSSAttempt(s.description) || isXSSAttempt(s.cost)) {
            reject(new HttpError(403, 'Injection attempt detected, aborting the request.'))
        } else {
            let query =
            'UPDATE spell SET '

            if (s.name != undefined) { query += `name = "${s.name}" ` }
            if (s.description != undefined) { query += `, description = "${s.description}" ` }
            if (s.level != undefined) { query += `, level = ${s.level} ` }
            if (s.charge != undefined) { query += `, charge = ${s.charge} ` }
            if (s.cost != undefined) { query += `, cost = "${s.cost}" ` }
            if (s.is_ritual != undefined) { query += `, is_ritual = ${s.is_ritual} ` }
            
            query += ` WHERE id = ${db.escape(id)}`

            db.query(query, async (err, result) => {
                if (err) {
                    reject(new HttpError(500, 'Database error - Spell update failed'))
                }
                console.log(`Updated "${s.name}" on ID ${old_spell.id}, affecting ${result.affectedRows} row(s)`)

                let updateSchoolsData = () => {
                    return new Promise((resolve, reject) => {
                        if (s.schools != undefined) {
                            if (s.schools.length > 0) {
                                let delete_schools_query =
                                `DELETE FROM spells_schools WHERE id_spell = ${old_spell.id}`
                    
                                db.query(delete_schools_query, async (err, result) => {
                                    if (err) {
                                        reject(new HttpError(500, 'Database error - Spell school deletion failed.'))
                                    }
                                })
                    
                                for (let i = 0; i < s.schools.length; i++) {
                                    if (!regexInt.test(s.schools[i].id)) {
                                        reject(new HttpError(403, 'Query error - School ID should be an integer !'))
                                    } else {}
                    
                                    let update_schools_query = `INSERT INTO spells_schools (id_spell, id_school) VALUES (${old_spell.id}, ${s.schools[i].id})`
                                    db.query(update_schools_query, async (err, result) => {
                                        if (err) {
                                            reject(new HttpError(500, 'Database error - No schools matching this ID'))
                                        } else {
                                            console.log(`Updated association school ID ${s.schools[i].id} to spell ID ${old_spell.id}`)
                                            resolve()
                                        }
                                    })
                                }
                            } else {
                                resolve()
                            }
                        } else {
                            resolve()
                        }
                    })
                }
        
                let updateVariablesData = () => {
                    return new Promise((resolve, reject) => {
                        if (s.variables != undefined) {
                            if (s.variables.length > 0) {
                                let delete_variables_query =
                                `DELETE FROM spells_variables WHERE id_spell = ${old_spell.id}`
                    
                                db.query(delete_variables_query, async (err, result) => {
                                    if (err) {
                                        reject(new HttpError(500, 'Database error - Spell variable deletion failed.'))
                                    }
                                })
                    
                                for (let i = 0; i < s.variables.length; i++) {
                                    if (!regexInt.test(s.variables[i].id)) {
                                        reject(new HttpError(403, 'Query error - Variable ID should be an integer !'))
                                    }
                    
                                    let update_variables_query = `INSERT INTO spells_variables (id_spell, id_variable) VALUES (${old_spell.id}, ${s.variables[i].id})`
                                    db.query(update_variables_query, async (err, result) => {
                                        if (err) {
                                            reject(new HttpError(500, 'Database error - No variables matching this ID'))
                                        } else {
                                            console.log(`Updated variable ID "${s.variables[i].id}" to spell ID ${old_spell.id}`)
                                            resolve()
                                        }
                                    })
                                }
                            } else {
                                resolve()
                            }
                        } else {
                            resolve()
                        }
                    })
                }
        
                let updateIngredientsData = () => {
                    return new Promise((resolve, reject) => {
                        if (s.ingredients != undefined) {
                            if (s.ingredients.length > 0) {
                                let delete_ingredients_query =
                                `DELETE FROM spells_ingredients WHERE id_spell = ${old_spell.id}`
                    
                                db.query(delete_ingredients_query, async (err, result) => {
                                    if (err) {
                                        reject(new HttpError(500, 'Database error - Spell ingredients deletion failed.'))
                                    }
                                    console.log(result)
                                })
                    
                                // Loops over ingredients query
                                for (let i = 0; i < s.ingredients.length; i++) {
                                    if (!regexInt.test(s.ingredients[i].id)) {
                                        reject(new HttpError(403, 'Query error - Ingredient ID should be an integer !'))
                                    }
                    
                                    let update_ingredients_query = `INSERT INTO spells_ingredients (id_spell, id_ingredient) VALUES (${old_spell.id}, ${s.ingredients[i].id})`
                                    db.query(update_ingredients_query, async (err, result) => {
                                        if (err) {
                                            reject(new HttpError(500, 'Database error - No ingredients matching this ID'))
                                        } else {
                                            console.log(`Updated ingredient ID "${s.ingredients[i].id}" to spell ID ${old_spell.id}`)
                                            resolve()
                                        }
                                    })
                                }
                            } else {
                                resolve()
                            }
                        } else {
                            resolve()
                        }
                    })
                }

                const promises = [
                    updateSchoolsData(),
                    updateVariablesData(),
                    updateIngredientsData()
                ]

                Promise.all(promises)
                .then(() => {
                    resolve(getSpell(old_spell.id))
                })
                .catch(err => {
                    reject(err)
                })
            })
        }
    })
    .catch(err => {
        throw err
    })
}
router.put('/:id/', async (req, res) => {
    updateSpell(req.body, req.params.id)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.send(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(JSON.stringify(
            {
                "error": err.message,
                "code": err.code
            })
        )
    })
})


// DELETE ONE ------------------
const deleteSpell = (id) => {
    return new Promise(async (resolve, reject) => {

        // Check if spell exists
        let old_spell = await getSpell(id)
        .catch(err => {
            reject(err)
        })

        if (old_spell == undefined) {
            reject((new HttpError(404, 'No spells matching this ID')))
        } else {
            let deleteSchoolsData = () => {
                return new Promise((resolve, reject) => {
                    let delete_schools_query = `DELETE FROM spells_schools WHERE id_spell = ${db.escape(id)}`
                    db.query(delete_schools_query, async (err, result) => {
                        if (err) {
                            reject(new HttpError(500, 'Spell schools deletion failed'))
                        } else {
                            console.log(`Deleted schools associated to spell ID ${db.escape(id)}`)
                            resolve()
                        }
                    })
                })
            }
    
            let deleteVariablesData = () => {
                return new Promise((resolve, reject) => {
                    let delete_variables_query = `DELETE FROM spells_variables WHERE id_spell = ${db.escape(id)}`
                    db.query(delete_variables_query, async (err, result) => {
                        if (err) {
                            console.log(err)
                            reject(new HttpError(500, 'Spell variables deletion failed'))
                        } else {
                            console.log(`Deleted variables associated to spell ID ${db.escape(id)}`)
                            resolve()
                        }
                    })
                })
            }
    
            let deleteIngredientsData = () => {
                return new Promise((resolve, reject) => {
                    let delete_ingredients_query = `DELETE FROM spells_ingredients WHERE id_spell = ${db.escape(id)}`
                    db.query(delete_ingredients_query, async (err, result) => {
                        if (err) {
                            console.log(err)
                            reject(new HttpError(500, 'Spell ingredients deletion failed'))
                        } else {
                            console.log(`Deleted ingredients associated to spell ID ${db.escape(id)}`)
                            resolve()
                        }
                    })
                })
            }
    
            let deleteSpellData = () => {
                return new Promise((resolve, reject) => {
                    let delete_spell_query = `DELETE FROM spell WHERE id = ${db.escape(id)}`
                    db.query(delete_spell_query, async (err, result) => {
                        if (err) {
                            console.log(err)
                            reject(new HttpError(500, 'Spell deletion failed'))
                        } else {
                            console.log(`Deleted spell ID ${db.escape(id)}, affecting ${result.affectedRows} rows`)
                            resolve()
                        }
                    })
                })
            }
    
            const promises = [
                deleteSchoolsData(),
                deleteVariablesData(),
                deleteIngredientsData()
            ]
    
            Promise.all(promises)
            .then(() => {
                deleteSpellData()
                let response = {
                    message: `Spell ID ${id} was successfully deleted.`
                }
                resolve(response)
            })
            .catch(err => {
                reject(err)
            })
        }
    })
    .catch(err => {
        throw err
    })
}
router.delete('/:id/', async (req, res) => {
    deleteSpell(req.params.id)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.send(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(JSON.stringify(
            {
                "error": err.message,
                "code": err.code
            })
        )
    })
})


// Param validation for single spell
    // (check if id is int) (could be refactored)
router.param('id', (req, res, next, id) => {
    try {
        if (regexInt.test(id)) {
            next()
        } else {
            throw new HttpError(403, 'Provided ID must be an integer and not zero')
        }
    } catch (err) {
        res.status(err.code).send(JSON.stringify(
            {
                "error": err.message,
                "code": err.code
            })
        )
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
                    reject(new HttpError(500, 'Database error'))
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
                    reject(new HttpError(500, 'Database error'))
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
                    reject(new HttpError(500, 'Database error'))
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

const isXSSAttempt = (string) => {
    if (regexXSS.test(string)) {
        return true
    } else {
        return false
    }
}

module.exports = router
