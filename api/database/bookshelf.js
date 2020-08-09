// MODULES
const fs = require('fs')
const mysql = require('mysql')

// Setting up the database connection
const knex = require('knex')({
    client: "mysql",
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : "auracle",
      charset  : "utf8"
    },
})
const bookshelf = require('bookshelf')(knex)

module.exports = { bookshelf }