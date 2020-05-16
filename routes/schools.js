'use strict'

const express = require('express')
let router = express.Router()

const connection = require('../database/connection')
const db = connection.db

// Model validation
const Validator = require('jsonschema').Validator
const v = new Validator()
const School = require("../models/School")
v.addSchema(School, "/SchoolModel")

const getSchools = () => {
    let getSchoolsPromise = new Promise((resolve, reject) => {

        let query = "SELECT DISTINCT * FROM school"

        db.query(query, async (err, result) => {
            if (err) return reject
            if (result.length == 0) { console.log("No school found in database") }

            // Loops over the results to fetch the associated tables
            for (let i = 0; i < result.length; i++) {
                result[i] = await buildSchool(result[i])
            }
            resolve(result)
        })
    })
    return getSchoolsPromise
}

const getSchool = (id) => {
    let getSchoolPromise = new Promise((resolve, reject) => {

        let query = "SELECT * FROM school WHERE id = " + db.escapeId(id)

        db.query(query, async (err, result) => {
            if (err) return reject
            result = await buildSchool(result[0])
            resolve(result);
        })
    })
    return getSchoolPromise
}

// ROUTES
// Get All
router.get('/', async (req, res, next) => {
    getSchools()
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
    getSchool(req.params.id)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.end(JSON.stringify(v))
    })
    .catch(err => {
        console.log(err)
        next()
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
// Builds the associated infos for a given school object
const buildSchool = async (school) => {

    // Fetches the school's parent school
    let fetchMetaSchoolData = new Promise((resolve, reject) => {
        let query =
        "SELECT ms.id, ms.name " +
        "FROM meta_school AS ms " +
        "WHERE ms.id = " + db.escapeId(school.id_meta_school)

        db.query(query, (err, result) => {
            if (err) return reject
            resolve(result)
        })
    })

    // Builds the school and returns it
    school.meta_school = await fetchMetaSchoolData
    return school
}

module.exports = router