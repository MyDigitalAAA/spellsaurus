import api from './api'

// URL for spells
const resource = "/spells"

// CRUD methods for spells
export default {
    getSpells() {
        return api.get(`${resource}`)
    },
    getSpell(id) {
        return api.get(`${resource}?id=${id}`)
    },
}