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
const School = require("../models/School")
v.addSchema(School, "/SchoolModel")

// Error handling
const { HttpError } = require('../models/Errors')


// ROUTES
// GET ALL ------------------
const getSchools = () => {
    return new Promise((resolve, reject) => {

        let query = "SELECT DISTINCT * FROM school"

        db.query(query, async (err, result) => {
            if (err) {
                reject(new HttpError(500, 'Database error'))
            } else if (result.length == 0) {
                reject(new HttpError(404, 'No schools were found'))
            }

            // Loops over the results to fetch the associated tables
            for (let i = 0; i < result.length; i++) {
                try {
                    result[i] = await buildSchool(result[i])
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
    getSchools()
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
const getSchool = (id) => {
    return new Promise((resolve, reject) => {

        let query = "SELECT * FROM school WHERE id = " + db.escape(id)

        db.query(query, async (err, result) => {
            if (err) {
                reject(new HttpError(500, 'Database error'))
            }
            try {
                result = buildSchool(result[0])
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
    getSchool(req.params.id)
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
const addSchool = (s) => {
    return new Promise(async (resolve, reject) => {

        // Checks if body exists and if the model fits, and throws errors if it doesn't
        if (isEmptyObject(s)) {
            reject(new HttpError(403, "Error: School cannot be nothing !"))
        } else if (!v.validate(s, School).valid) {
            reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(s, School).errors))
        } else if (isXSSAttempt(s.name) || isXSSAttempt(s.description)) {
            reject(new HttpError(403, 'Injection attempt detected, aborting the request.'))
        } else {
            let query = `INSERT INTO school (name, description, id_meta_school) VALUES (${db.escape(s.name)}, ${db.escape(s.description)}, ${db.escape(s.id_meta_school)})`

            db.query(query, (err, result) => {
                if (err) {
                    if (err.errno == 1452) {
                        reject(new HttpError(404, "Error: No meta school matching this ID"))
                    } else {
                        reject(new HttpError(500, 'Database error'))
                    }
                } else {
                    console.log(`Inserted "${s.name}" with ID ${result.insertId}, affecting ${result.affectedRows} row(s)`)

                    const new_school_id = result.insertId
    
                    getSchool(new_school_id)
                    .then(v => {
                        resolve(v)
                    })
                    .catch(err => {
                        reject(err)
                    })
                }
            })
        }
    }).catch(err => {
        throw err
    })
}
router.post('/', async (req, res) => {
    addSchool(req.body)
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

// Param validation for single school
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
        res.status(err.code).send(JSON.stringify(
            {
                "error": err.message,
                "code": err.code
            })
        )
    }
})

// SHARED FUNCTIONS ------------------

// Builds the associated infos for a given school object
const buildSchool = async (school) => {

    // Fetches the school's parent school
    let fetchMetaSchoolData = (s) => {
        return new Promise((resolve, reject) => {

            if (s == null) { reject(new HttpError(404, "Error: No school matching this ID"))}

            let query =
            "SELECT ms.id, ms.name " +
            "FROM meta_school AS ms " +
            "WHERE ms.id = " + s.id_meta_school
            
    
            db.query(query, (err, result) => {
                if (err) {
                    reject(new HttpError(500, 'Database error'))
                } else {
                    delete s.id_meta_school
                    s.meta_school = result
                    resolve(s)
                }
            })
        })
    }

    let s = fetchMetaSchoolData(school)
    .catch(err => {
        throw err
    })

    return s
}

// Check if object is null
const isEmptyObject = (obj) => {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        return true
    } else {
        return false
    }
}

// Check if script injection attempt
const isXSSAttempt = (string) => {
    if (regexXSS.test(string)) {
        return true
    } else {
        return false
    }
}

module.exports = router