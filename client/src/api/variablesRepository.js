import api from './api'

// URL for spells
const resource = "/variables"

// CRUD methods for spells
export default {
    getVariables() {
        return api.get(`${resource}`)
    },
    getVariable(id) {
        return api.get(`${resource}/${id}`)
    },
}