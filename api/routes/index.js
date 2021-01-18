const spells = require('./spells');
const schools = require('./schools');
const meta_schools = require('./meta_schools');
const variables = require('./variables');
const ingredients = require('./ingredients');
const users = require('./users');

const auth = require('./auth');

module.exports = {
    auth,
    spells,
    schools,
    meta_schools,
    ingredients,
    variables,
    users,
}