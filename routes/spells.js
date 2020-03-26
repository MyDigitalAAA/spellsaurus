const express = require('express');
let router = express.Router();

const connection = require('../database/connection');
const db = connection.db;

getSpells = () => {
    let fetchSpellsData = new Promise((resolve, reject) => {
        let query =
        "SELECT DISTINCT * " +
        "FROM spell";

        db.query(query, (err, result) => {
            if (err) { return reject }
            if (result.length == 0) { console.log("No results found") }

            for (let i = 0; i < result.length; i++) {
                let currentSpell = result[i];
                
                let schoolQuery;
            }
        })

        let fetchSpellsSchoolsData = new Promise((resolve, reject) => {
            
        })
    })

    return fetchSpellsData;
}

router
.get('/', (req, res, next) => {
    getSpells().then(v => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({spells : v}));
    })
})


module.exports = router