'use strict';

// MODULES
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors') // module to format the json response
const dotenv = require('dotenv').config()

// Creates instances of database connections
const connection = require('./database/bookshelf')
const db = connection.db

// CONSTANTS
const port = 2814

// Import routes
const routes = require('./routes')

// Builds app w/ express
let app = express()
app.use(bodyParser.json({ limit: '10kb' }))
app.use(cors())
app.use(morgan('tiny'))
app.use(helmet())

// Serves
const server = app.listen( port, () => {console.log(`App listening on port ${port}`)})

// Auth
app.all('*', (req, res, next) => {
    if (req.headers.auracle_key !== process.env.API_KEY) {
        return res.status(401).send('The API is either missing or incorrect.')
    } else {
        next()
    }
})

// Routing
app.use('/api/spells', routes.spells)
app.use('/api/schools', routes.schools)
app.use('/api/meta_schools', routes.meta_schools)
app.use('/api/variables', routes.variables)
app.use('/api/ingredients', routes.ingredients)
app.use('/api/users', routes.users)

