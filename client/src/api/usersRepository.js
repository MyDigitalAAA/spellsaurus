import api from './api'

const resource = "/users"

export default {
    login(data) {
        return api.post(`${resource}/login`, data)
    },
    addOne(data) {
        return api.post(`${resource}`, data)
    },
}