'use strict'
// Bookshelf
const bookshelf = require('../database/connection').bookshelf

const Spells = require('./spell-repository')

const MetaSchoolRepository = require('./meta-school-repository')
const MetaSchools = new MetaSchoolRepository()

class SchoolRepository {

    constructor() {
        this.model = bookshelf.Model.extend({
            tableName: 'school',
            spells() {
                return this.belongsToMany( Spells._model, 'spell_school', 'school_id', 'spell_id')
            },
            meta_schools() {
                return this.belongsTo( MetaSchools._model, 'meta_school_id')
            }
        })
    }

    set model(model) {
        this._model = model
    }

    get model() {
        return this._model
    }
}

module.exports = SchoolRepository