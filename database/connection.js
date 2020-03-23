// MODULES
const fs = require('fs')
const mysql = require('mysql')

// Fetches and parses credentials file
let credentials_data = fs.readFileSync('./database/credentials.json')
let credentials = JSON.parse(credentials_data)

const db = mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
    database: credentials.database,
})

module.exports = { db }