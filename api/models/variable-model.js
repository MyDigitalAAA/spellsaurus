'use strict'
const bookshelf = require('../database/bookshelf').bookshelf

require('./spell-model')

let Variable = bookshelf.Model.extend({
    tableName: 'variable',
    spells() {
        return this.belongsToMany( 'Spell', 'spell_variable')
    }
})

module.exports = bookshelf.model('Variable', Variable)