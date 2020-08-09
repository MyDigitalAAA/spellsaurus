'use strict'
const bookshelf = require('../database/bookshelf').bookshelf

require('./school-model')

let MetaSchool = bookshelf.Model.extend({
    tableName: 'meta_school',
    schools() {
        return this.hasMany( 'School' )
    }
})

module.exports = bookshelf.model('MetaSchool', MetaSchool)