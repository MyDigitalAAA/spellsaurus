import api from './api'

const resource = "/schools"

export default {
    getOne() {
        return api.get(`${resource}`)
    },
    getAll(id) {
        return api.get(`${resource}/${id}`)
    }
}