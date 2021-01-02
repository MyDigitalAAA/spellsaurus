const bookshelf = require('../database/bookshelf').bookshelf

require('./role-model')

let Permission = bookshelf.Model.extend({
    tableName: 'permission',
    hidden: [ 'id' ],
    role() {
        return this.belongsToMany( 'Role', 'role_permission' )
    }
})

module.exports = bookshelf.model( 'Permission', Permission );