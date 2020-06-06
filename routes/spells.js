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
    return Spells.deleteOne(id)
    .catch(err => {
        console.log(err)
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
