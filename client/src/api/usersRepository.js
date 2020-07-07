import api from './api'

const resource = "/users"

export default {
    login(data) {
        return api.post(`${resource}/login`, data)
    },
    register(data) {
        return api.post(`${resource}`, data)
    },
}