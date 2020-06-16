import api from './api'

// URL for spells
const resource = "/ingredients"

// CRUD methods for spells
export default {
    getIngredients() {
        return api.get(`${resource}`)
    },
    getIngredient(id) {
        return api.get(`${resource}/${id}`)
    },
}