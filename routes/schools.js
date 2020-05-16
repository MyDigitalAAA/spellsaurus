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
const School = require("../models/School")
v.addSchema(School, "/SchoolModel")

// Error handling
const { HttpError } = require('../models/Errors')


// ROUTES
// GET ALL ------------------
const getSchools = () => {
    let getSchoolsPromise = new Promise((resolve, reject) => {

        let query = "SELECT DISTINCT * FROM school"

        db.query(query, async (err, result) => {
            if (err) {
                reject(new HttpError(500, 'Error: Database error'))
            } else if (result.length == 0) {
                reject(new HttpError(404, 'Error: No ressource matching this id'))
            } else {
                result = await buildSchool(result[0])
                resolve(result);
            }
        })
    })
    .catch(err => { throw err })

    return getSchoolsPromise
}
router.get('/', async (req, res, next) => {
    getSchools()
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.end(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(err.message)
    })
})


// GET ONE ------------------
const getSchool = (id) => {
    let getSchoolPromise = new Promise((resolve, reject) => {

        let query = "SELECT * FROM school WHERE id = " + db.escape(id)

        db.query(query, async (err, result) => {
            if (err) return reject
            result = await buildSchool(result[0])
            resolve(result);
        })
    })
    .catch(err => { throw err })

    return getSchoolPromise
}
router.get('/:id/', async (req, res, next) => {
    getSchool(req.params.id)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.end(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(err.message)
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
        res.status(err.code).send(err.message)
    }
})

// SHARED FUNCTIONS ------------------

// Builds the associated infos for a given school object
const buildSchool = async (school) => {

    // Fetches the school's parent school
    let fetchMetaSchoolData = new Promise((resolve, reject) => {
        let query =
        "SELECT ms.id, ms.name " +
        "FROM meta_school AS ms " +
        "WHERE ms.id = " + school.id_meta_school

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

    // Builds the school and returns it
    school.meta_school = await fetchMetaSchoolData
    return school
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