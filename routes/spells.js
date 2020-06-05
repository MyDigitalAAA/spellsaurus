'use strict'

// Router
const express = require('express')
let router = express.Router()

// Connection
const connection = require('../database/connection')
const db = connection.db

// Repository
const SpellReposity = require('../repositories/spell-repository');
const Spells = new SpellReposity();

const regexInt = RegExp(/^[1-9]\d*$/)

// ROUTES
// GET ALL ------------------
const getSpells = () => {
    return Spells.getAll()
    .catch(err => {
        console.log(err)
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
    return Spells.getOne(id)
    .catch(err => {
        console.log(err)
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
    return Spells.addOne(s)
    .catch(err => {
        console.log(err)
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
        } else if (!v.validate(s, SpellModel).valid) {
            reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(s, SpellModel).errors))
        } else if (isXSSAttempt(s.name) || isXSSAttempt(s.description) || isXSSAttempt(s.cost)) {
            reject(new HttpError(403, 'Injection attempt detected, aborting the request.'))
        } else {

            let updateSchoolsData = () => {
                return new Promise((resolve, reject) => {
                    if (s.schools !== null) {
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
                                        reject(new HttpError(404, 'Database error - No schools matching this ID'))
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
                    if (s.variables !== null) {
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
                                        reject(new HttpError(404, 'Database error - No variables matching this ID'))
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
                    if (s.ingredients !== null) {
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
                                        reject(new HttpError(404, 'Database error - No ingredients matching this ID'))
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

            let updateSpellData = () => {
                return new Promise((resolve, reject) => {
                    let update_spell_query =
                    'UPDATE spell SET '
        
                    if (s.name !== null) { update_spell_query += `name = "${s.name}" ` }
                    if (s.description !== null) { update_spell_query += `, description = "${s.description}" ` }
                    if (s.level !== null) { update_spell_query += `, level = ${s.level} ` }
                    if (s.charge !== null) { update_spell_query += `, charge = ${s.charge} ` }
                    if (s.cost !== null) { update_spell_query += `, cost = "${s.cost}" ` }
                    if (s.is_ritual !== null) { update_spell_query += `, is_ritual = ${s.is_ritual} ` }
                    
                    update_spell_query += ` WHERE id = ${db.escape(id)}`

                    db.query(update_spell_query, async (err, result) => {
                        if (err) {
                            reject(new HttpError(500, 'Database error - Spell update failed'))
                        } else {
                            console.log(`Updated "${s.name}" on ID ${old_spell.id}, affecting ${result.affectedRows} row(s)`)
                            resolve()
                        }
                    })
                })
            }

            const sub_promises = [
                updateSchoolsData(),
                updateVariablesData(),
                updateIngredientsData()
            ]

            Promise.all(sub_promises)
            .then(() => {
                updateSpellData()
            })
            .then(() => {
                resolve(getSpell(old_spell.id))
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
        .catch(() => {
            reject((new HttpError(404, 'No spell matching this ID')))
        })

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

module.exports = router
