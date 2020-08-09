'use strict'
const bookshelf = require('../database/bookshelf').bookshelf

require('./spell-model')

let Ingredient = bookshelf.Model.extend({
    tableName: 'ingredient',
    spells() {
        return this.belongsToMany( 'Spell', 'spell_ingredient')
    }
})

module.exports = bookshelf.model('Ingredient', Ingredient)