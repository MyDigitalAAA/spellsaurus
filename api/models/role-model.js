const bookshelf = require('../database/bookshelf').bookshelf

require('./permission-model')

let Role = bookshelf.Model.extend({
    tableName: 'role',
    permissions() {
        return this.belongsToMany( 'Permission', 'role_permission' );
    }
})

module.exports = bookshelf.model( 'Role', Role );