'use strict'
const bookshelf = require('../database/bookshelf').bookshelf;

require('./role-model');
require('./spell-model');

let User = bookshelf.Model.extend({
    tableName: 'user',
    hidden: [ 'password' ],
    role() {
        return this.belongsTo( 'Role' );
    },
    spells() {
        return this.hasMany( 'Spell', 'author_id' );
    }
})

module.exports = bookshelf.model('User', User)