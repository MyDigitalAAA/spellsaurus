// Router
const express = require('express')
let router = express.Router()

// Connection
const connection = require('../database/connection')
const db = connection.db

// Hashing and passwords
const bcrypt = require('bcrypt')

// Validations
const regexInt = RegExp(/^[1-9]\d*$/)
const regexXSS = RegExp(/<[^>]*script/)

// Model validation
const Validator = require('jsonschema').Validator
const v = new Validator()
const User = require("../models/UserValidation")
v.addSchema(User, "/UserModel")

// Error handling
const { HttpError } = require('../models/Errors')

// ROUTES
// GET ALL ------------------
const getUsers = () => {
    return new Promise((resolve, reject) => {

        let query = "SELECT DISTINCT * FROM user"

        db.query(query, async (err, result) => {
            if (err) {
                reject(new HttpError(500, 'Database error'))
            } else if (result.length == 0) {
                reject(new HttpError(404, 'No users were found'))
            } else {
                resolve(result)
            }
        })
    })
    .catch(err => {
        throw err
    })
}
router.get('/', async (req, res) => {
    getUsers()
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
const getUser = (id) => {
    return new Promise((resolve, reject) => {

        let query = "SELECT * FROM user WHERE id = " + db.escape(id)

        db.query(query, async (err, result) => {
            if (err) {
                reject(new HttpError(500, 'Database error'))
            } else if (result.length == 0) {
                reject(new HttpError(404, 'No User matching this ID'))
            } else {
                resolve(result)
            }
        })
    })
    .catch(err => {
        throw err
    })
}
router.get('/:id/', async (req, res) => {
    getUser(req.params.id)
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
const addUser = (u) => {
    return new Promise(async (resolve, reject) => {

        // Checks if body exists and if the model fits, and throws errors if it doesn't
        if (isEmptyObject(u)) {
            reject(new HttpError(403, "Error: User cannot be empty !"))
        } else if (!v.validate(u, User).valid) {
            reject(new HttpError(403, "Error: Schema is not valid - " + v.validate(u, User).errors))
        } else if (isXSSAttempt(u.name) || isXSSAttempt(u.mail) || isXSSAttempt(u.password)) {
            reject(new HttpError(403, 'Injection attempt detected, aborting the request.'))
        } else {
            let query = `INSERT INTO user (name, mail, password) VALUES (${db.escape(u.name)}, ${db.escape(u.mail)}, ${db.escape(u.password)})`

            db.query(query, async (err, result) => {
                if (err) {
                    reject(new HttpError(500, 'Database error'))
                } else {
                    console.log(`Inserted "${u.name}" with ID ${result.insertId}, affecting ${result.affectedRows} row(s)`)
                    const new_user_id = result.insertId
                    let response = {
                        "message": `User created successfully !`,
                        "inserted_id": `${new_user_id}`
                    }
                    resolve(response)
                }
            })
        }
    }).catch(err => {
        throw err
    })
}
router.post('/', async (req, res) => {
    addUser(req.body)
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
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {

        // Check if user exists
        let old_user = await getUser(id)
        .catch(() => {
            reject((new HttpError(404, 'No user matching this ID')))
        })

        console.log(old_user)

        let deleteUserData = () => {
            return new Promise((resolve, reject) => {
                let delete_user_query = `DELETE FROM user WHERE id = ${db.escape(id)}`
                db.query(delete_user_query, async (err, result) => {
                    if (err) {
                        console.log(err)
                        reject(new HttpError(500, 'Spell deletion failed'))
                    } else {
                        let response = {
                            "message": "User delete successully",
                            "deleted_id": `${id}`
                        }
                        resolve(response)
                    }
                })
            })
        }

        deleteUserData()
        .then(v => {
            resolve(v)
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
    deleteUser(req.params.id)
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

// Param validation for single user
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
            })
        )
    }
})

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