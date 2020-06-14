import api from './api'

// URL for spells
const resource = "/schools"

// CRUD methods for spells
export default {
    getSchools() {
        return api.get(`${resource}`)
    },
    getSchool(id) {
        return api.get(`${resource}/${id}`)
    },
    getSpellsFromSchool(id) {
        return api.get(`${resource}/${id}/spells`)
    }
}