'use strict'
const bookshelf = require('../database/bookshelf').bookshelf;

require('./role-model');

let User = bookshelf.Model.extend({
    tableName: 'user',
    hidden: [ 'password' ],
    role() {
        return this.belongsTo( 'Role' );
    },
})

module.exports = bookshelf.model('User', User)