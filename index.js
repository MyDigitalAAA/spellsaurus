'use strict';

// MODULES
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors') // module to format the json response

// Creates instances of database connections
const connection = require('./database/connection')
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

// Routing
app.use('/api/spells', routes.spells)
app.use('/api/schools', routes.schools)