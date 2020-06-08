'use strict'
const bookshelf = require('../database/bookshelf').bookshelf

let User = bookshelf.Model.extend({
    tableName: 'user',
})

module.exports = bookshelf.model('User', User)