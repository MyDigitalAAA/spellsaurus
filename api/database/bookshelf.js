// MODULES
const fs = require('fs');

// Setting up the database connection
const knex = require('knex')({
    client: "mysql",
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE,
      charset  : "utf8"
    },
});
const bookshelf = require('bookshelf')(knex);

module.exports = { bookshelf };