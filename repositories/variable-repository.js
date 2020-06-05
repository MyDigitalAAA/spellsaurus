'use strict'
// Bookshelf
const bookshelf = require('../database/connection').bookshelf

const Spells = require('./spell-repository')

class VariableRepository {

    constructor() {
        this.model = bookshelf.Model.extend({
            tableName: 'variable',
            spells() {
                return this.belongsToMany( Spells._model, 'spell_variable', 'variable_id', 'spell_id')
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

module.exports = VariableRepository