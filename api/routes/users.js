'use strict'

// Router
const express = require('express')
let router = express.Router()

// Connection
const connection = require('../database/bookshelf')
const db = connection.db

// Repository
const UserRepository = require('../repositories/user-repository');
const Users = new UserRepository();

// ROUTES
// GET ALL ------------------
const getUsers = () => {
    return Users.getAll()
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


// GET ONE FROM UUID ------------------
const getUserByUUID = (uuid) => {
    return Users.getOneByUUID(uuid)
    .catch(err => {
        throw err
    })
}
router.get('/:uuid/', async (req, res) => {
    getUserByUUID(req.params.uuid)
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
const getSpellsFromUser = (uuid) => {
  return Users.getSpellsFromOne(uuid)
  .catch(err => {
      throw err
  })
}
router.get('/:uuid/spells', async (req, res) => {
  getSpellsFromUser(req.params.uuid)
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


// CHECK IF MAIL IS AVAILABLE ------------------
const checkIfEmailAvailable = (mail) => {
  return Users.checkIfEmailAvailable(mail)
  .catch(err => {
      throw err
  })
}
router.get('/available/:mail/', async (req, res) => {
  checkIfEmailAvailable(req.params.mail)
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
    return Users.addOne(u)
    .catch(err => {
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


// VERIFY A USER
const verifyUser = (token) => {
    return Users.verifyUser(token)
    .catch(err => {
      throw err;
    })
}
router.get('/verification/:token', async (req, res) => {
    verifyUser(req.params.token)
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
});

// LOG A USER ------------------
const logUser = (mail, password) => {
  return Users.logUser(mail, password)
  .catch(err => {
      throw err
  })
}
router.post('/login', async (req, res) => {
  logUser(req.body.mail, req.body.password)
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

module.exports = router