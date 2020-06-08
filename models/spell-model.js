'use strict'
const bookshelf = require('../database/bookshelf').bookshelf

require('./school-model')
require('./variable-model')
require('./ingredient-model')

let Spell = bookshelf.Model.extend({
    tableName: 'spell',
    schools() {
        return this.belongsToMany( 'School', 'spell_school' )
    },
    variables() {
        return this.belongsToMany( 'Variable', 'spell_variable' )
    },
    ingredients() {
        return this.belongsToMany( 'Ingredient', 'spell_ingredient' )
    }
})

module.exports = bookshelf.model('Spell', Spell)