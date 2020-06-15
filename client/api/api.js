import axios from "axios"

const url = "http://localhost:2814/api"

axios.defaults.headers.common['auracle_key'] = process.env.VUE_APP_API_KEY

export default axios.create({
    baseURL: url
})