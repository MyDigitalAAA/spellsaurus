'use strict'

// Router
const express = require('express')
let router = express.Router()

// Connection
const connection = require('../database/bookshelf')
const functions = require('../functions')

// Repository
const SpellReposity = require('../repositories/spell-repository');
const Spells = new SpellReposity();

// ROUTES
// GET ALL PUBLIC ------------------
const getPublicSpells = (name, description, level, charge, cost, ritual) => {
    return Spells.getAllPublic(name, description, level, charge, cost, ritual)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.get('//:name?/:description?/:level?/:charge?/:cost?/:ritual?/', async (req, res) => {
    getPublicSpells(req.query.name, req.query.description, req.query.level, req.query.charge, req.query.cost, req.query.ritual)
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

// GET ALL ------------------
const getSpells = (name, description, level, charge, cost, ritual) => {
    return Spells.getAll(name, description, level, charge, cost, ritual)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.get('/private/:name?/:description?/:level?/:charge?/:cost?/:ritual?/', async (req, res) => {
    getSpells(req.query.name, req.query.description, req.query.level, req.query.charge, req.query.cost, req.query.ritual)
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

// GET SOME ------------------
const getSomeSpells = (page) => {
    return Spells.getPage(page)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.get('/page/:page', async (req, res) => {
    getSomeSpells(req.params.page)
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

// Param validations
router.param('id', functions.paramIntCheck)
router.param('page', functions.paramIntCheck)

module.exports = router
