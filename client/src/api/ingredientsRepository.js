import api from './api'

const resource = "/ingredients"

export default {
    getIngredients() {
        return api.get(`${resource}`)
    },
    getIngredient(id) {
        return api.get(`${resource}/${id}`)
    },
}