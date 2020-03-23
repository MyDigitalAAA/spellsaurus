const express = require('express');
let router = express.Router();

const connection = require('../database/connection');
const db = connection.db;

getSpells = () => {
    return new Promise((resolve, reject) => {
        let query =
        "SELECT * " +
        "FROM spell";

        db.query(query, (err, result) => {
            if (err) {
                return reject;
            }
            resolve(result);
        })

    })
}

router
.get('/', (req, res, next) => {
    getSpells().then(v => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({spells : v}));
    })
})


module.exports = router