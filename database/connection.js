// MODULES
const fs = require('fs');
const mysql = require('mysql');

// Fetches and parses credentials file
let credentials_data = fs.readFileSync('./database/credentials.json');
let credentials = JSON.parse(credentials_data);

const db = mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
    database: credentials.database,
})

const getSpells = () => {
    return new Promise((resolve, reject) => {
        let query =
        "SELECT * " +
        "FROM spell";

        db.query(query, (err, result, fields) => {
            if (err) {
                return reject;
            }
            resolve(result);
        })

    })
}

const closeConnection = (err) => {
    db.end();
}

module.exports = { db, getSpells, closeConnection }