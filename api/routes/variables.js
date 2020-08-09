'use strict'

// Router
const express = require('express')
let router = express.Router()

// Connection
const connection = require('../database/bookshelf')
const functions = require('../functions')

// Repository
const VariableRepository = require('../repositories/variable-repository');
const Variables = new VariableRepository();

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


// GET SPELLS FROM ONE ------------------
const getSpellsFromOne = (id) => {
    return Variables.getSpellsFromOne(id)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.get('/:id/spells', async (req, res) => {
    getSpellsFromOne(req.params.id)
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

// Param validations
router.param('id', functions.paramIntCheck)

module.exports = router