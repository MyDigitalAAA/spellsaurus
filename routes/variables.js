'use strict'

// Router
const express = require('express')
let router = express.Router()

// Connection
const connection = require('../database/bookshelf')
const db = connection.db

// Repository
const VariableRepository = require('../repositories/variable-repository');
const Variables = new VariableRepository();

const regexInt = RegExp(/^[1-9]\d*$/)

// Error handling
const { HttpError } = require('../validations/Errors')

// ROUTES
// GET ALL ------------------
const getvariables = () => {
    return Variables.getAll()
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.get('/', async (req, res) => {
    getvariables()
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
const getVariable = (id) => {
    return Variables.getOne(id)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.get('/:id/', async (req, res) => {
    getVariable(req.params.id)
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
const addVariable = (vr) => {
    return Variables.addOne(vr)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.post('/', async (req, res) => {
    addVariable(req.body)
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
const updateVariable = (id, vr) => {
    return Variables.updateOne(id, vr)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.put('/:id/', async (req, res) => {
    updateVariable(req.params.id, req.body)
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
const deleteVariable = (id) => {
    return Variables.deleteOne(id)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.delete('/:id/', async (req, res) => {
    deleteVariable(req.params.id)
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

// Param validation for ID
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