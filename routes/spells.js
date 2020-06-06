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

// Error handling
const { HttpError } = require('../models/Errors')

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
const updateSpell = (id, s) => {
    return Spells.updateOne(id, s)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.put('/:id/', async (req, res) => {
    updateSpell(req.params.id, req.body)
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
            throw new Error;
        }
    } catch (err) {
        err = new HttpError(403, 'Provided ID must be an integer and not zero')
        res.status(err.code).send(JSON.stringify(
            {
                "error": err.message,
                "code": err.code
            })
        )
    }
})

module.exports = router
