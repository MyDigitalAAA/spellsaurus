'use strict'

// Router
const express = require('express')
let router = express.Router()

// Connection
const connection = require('../database/bookshelf')
const db = connection.db

// Repository
const IngredientRepository = require('../repositories/ingredient-repository');
const Ingredients = new IngredientRepository();

const regexInt = RegExp(/^[1-9]\d*$/)

// Error handling
const { HttpError } = require('../validations/Errors')

// ROUTES
// GET ALL ------------------
const getIngredients = () => {
    return Ingredients.getAll()
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.get('/', async (req, res) => {
    getIngredients()
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
const getIngredient = (id) => {
    return Ingredients.getOne(id)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.get('/:id/', async (req, res) => {
    getIngredient(req.params.id)
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
    return Ingredients.getSpellsFromOne(id)
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
const addIngredient = (igr) => {
    return Ingredients.addOne(igr)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.post('/', async (req, res) => {
    addIngredient(req.body)
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
const updateIngredient = (id, igr) => {
    return Ingredients.updateOne(id, igr)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.put('/:id/', async (req, res) => {
    updateIngredient(req.params.id, req.body)
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
const deleteIngredient = (id) => {
    return Ingredients.deleteOne(id)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.delete('/:id/', async (req, res) => {
    deleteIngredient(req.params.id)
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