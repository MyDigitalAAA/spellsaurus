import api from './api'

const resource = "/users"

export default {
  getOneFromUUID(uuid) {
    return api.get(`${resource}/${uuid}`,)
  },
  login(data) {
    return api.post(`${resource}/login`, data)
  },
  register(data) {
    return api.post(`${resource}`, data)
  },
}