// MODULES
const express = require('express');
let connection = require('./connection');
    const db = connection.db;


// CONSTANTS
const port = 2814;


const query = "SELECT * FROM spell";

// make to connection to the database.
db.connect( err => {
    if (err) { throw err }
    console.log("Connected");
    db.query(query, (err, result, fields) => {
        console.log(result[0]);
    });
});

app = express();

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});