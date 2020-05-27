// MODULES
const fs = require('fs')
const mysql = require('mysql')

// Fetches and parses credentials file
let credentials_data = fs.readFileSync('./database/credentials.json')
let credentials = JSON.parse(credentials_data)

// Setting up the database connection
const knex = require('knex')({
    client: credentials.client,
    connection: {
      host     : credentials.host,
      user     : credentials.user,
      password : credentials.password,
      database : credentials.database,
      charset  : credentials.charset
    },
    debug: true
})
const bookshelf = require('bookshelf')(knex)

const db = mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
    database: credentials.database,
})

db.on('error', err => {
    if (err.errno == 'ECONNRESET') {
        console.log("The connection was reset during your request. Please try again later.");
    }
})

module.exports = { db, bookshelf }