// MODULES
const express = require('express');
const connection = require('./database/connection');
    const getSpells = connection.getSpells;
    const closeConnection = connection.closeConnection;

// CONSTANTS
const port = 2814;

// APP
app = express();
const server = app.listen(port, () => {console.log(`App listening on port ${port}`)});

// getSpells().then((v) => {
//     console.log(v);
// }).catch(r => {
//     console.log(r);
// })

app.route('/spells')
    .get((req, res, next) => {
        getSpells().then(v => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({spells : v}));
        })
    })

// On process exit
process.on('SIGINT', () => {
    closeConnection();
    server.close();
})