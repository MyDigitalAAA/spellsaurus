import api from './api'

const resource = "/meta_schools"

export default {
    getAll() {
        return api.get(`${resource}`)
    },
    getOne(id) {
        return api.get(`${resource}/${id}`)
    },
}