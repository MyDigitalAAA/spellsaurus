'use strict'
const bookshelf = require('../database/bookshelf').bookshelf;

require('./user-model');

let APIToken = bookshelf.Model.extend({
    tableName: 'api_token',
    hidden: [ 'id' ],
    user() {
        return this.hasOne( 'User', 'user_uuid' );
    }
})

module.exports = bookshelf.model( 'APIToken', APIToken );