const bookshelf = require('../database/bookshelf').bookshelf

let Role = bookshelf.Model.extend({
    tableName: 'role',
})

module.exports = bookshelf.model('Role', Role);