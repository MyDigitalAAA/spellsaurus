'use strict'
// Bookshelf
const bookshelf = require('../database/connection').bookshelf

const Spells = require('./spell-repository')

class IngredientRepository {

    constructor() {
        this.model = bookshelf.Model.extend({
            tableName: 'ingredient',
            spells() {
                return this.belongsToMany( Spells._model, 'spell_ingredient', 'ingredient_id', 'spell_id')
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

module.exports = IngredientRepository