'use strict';

// MODULES
const express = require('express')
const cors = require('cors')

const connection = require('./database/connection')
const db = connection.db

// CONSTANTS
const port = 2814

// Import routes
const routes = require('./routes')

// Builds app
let app = express()
app.use(cors())
const server = app.listen( port, () => { console.log(`App listening on port ${port}`)} )

app.use('/api/spells', routes.spells)

// On process kill with SIGINT
process.on('SIGINT', () => {
    db.end()
    server.close()
})
