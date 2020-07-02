import api from './api'

const resource = "/ingredients"

export default {
    getAll() {
        return api.get(`${resource}`)
    },
    getOne(id) {
        return api.get(`${resource}/${id}`)
    },
}