'use strict'
// Bookshelf
const bookshelf = require('../database/connection').bookshelf

const Schools = require('./school-repository')

class MetaSchoolRepository {

    constructor() {
        this.model = bookshelf.Model.extend({
            tableName: 'meta_school',
            schools() {
                return this.hasMany( Schools._model )
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

module.exports = MetaSchoolRepository