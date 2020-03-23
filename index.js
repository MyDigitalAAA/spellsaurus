// MODULES
const express = require('express');

const connection = require('./database/connection');
const db = connection.db;

// 
const routes = require('./routes');

// CONSTANTS
const port = 2814;

// APP
app = express();
const server = app.listen( port, () => {console.log(`App listening on port ${port}`)});

app.use('/spells', routes.spells);

// On process kill with SIGINT
process.on('SIGINT', () => {
    db.end();
    server.close();
    console.log('Server closed');
})
