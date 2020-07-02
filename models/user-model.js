'use strict'
const bookshelf = require('../database/bookshelf').bookshelf

let User = bookshelf.Model.extend({
    tableName: 'user',
    hidden: ['id', 'password']
})

module.exports = bookshelf.model('User', User)