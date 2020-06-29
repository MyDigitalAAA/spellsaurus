import api from './api'

const resource = "/variables"

export default {
    getVariables() {
        return api.get(`${resource}`)
    },
    getVariable(id) {
        return api.get(`${resource}/${id}`)
    },
}