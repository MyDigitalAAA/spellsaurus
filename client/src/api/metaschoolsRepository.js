import api from './api'

const resource = "/meta_schools"

export default {
    getMetaSchools() {
        return api.get(`${resource}`)
    },
    getMetaSchool(id) {
        return api.get(`${resource}/${id}`)
    },
}