'use strict'

// Router
const express = require('express');
let router = express.Router();

// Repository
const UserRepository = require('../repositories/user-repository');
const Users = new UserRepository();

// ROUTES
// ENTRY POINT
const authUser = (mail, password) => {
    return Users.logUserToAPI(mail, password)
    .catch(err => {
        throw err
    })
}
router.get('/login', async (req, res) => {
    authUser(req.body.mail, req.body.password)
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

// GEN API TOKEN
const generateAPIToken = (mail, password) => {
    return Users.genAPIToken(mail, password)
    .catch(err => {
        throw err
    })
}
router.get('/genToken', async (req, res) => {
  generateAPIToken(req.body.mail, req.body.password)
  .then(v => {
      res.setHeader('Content-Type', 'application/json;charset=utf-8')
      res.end(JSON.stringify(v))
  })
  .catch(err => {
      res.status(err.code).send(JSON.stringify(err))
  })
})

module.exports = router