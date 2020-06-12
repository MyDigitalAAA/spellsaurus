import api from './api'

// URL for spells
const resource = "/spells"

// CRUD methods for spells
export default {
    getSpells() {
        return api.get(`${resource}`)
    },
    getSpell(id) {
        return api.get(`${resource}/${id}`)
    },
    addSpell(data) {
        return api.post(`${resource}`, data)
    },
    updateSpell(id, data) {
        return api.put(`${resource}/${id}`, data)
    }
}