import api from './api'

// URL for spells
const resource = "/meta_schools"

// CRUD methods for spells
export default {
    getMetaSchools() {
        return api.get(`${resource}`)
    },
    getMetaSchool(id) {
        return api.get(`${resource}/${id}`)
    },
}