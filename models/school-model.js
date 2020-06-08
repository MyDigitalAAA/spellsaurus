'use strict'
const bookshelf = require('../database/bookshelf').bookshelf

require('./spell-model')
require('./meta-school-model')

let School = bookshelf.Model.extend({
    tableName: 'school',
    spells() {
        return this.belongsToMany( 'Spell', 'spell_school')
    },
    meta_schools() {
        return this.belongsTo( 'MetaSchool', 'meta_school_id')
    }
})

module.exports = bookshelf.model('School', School)