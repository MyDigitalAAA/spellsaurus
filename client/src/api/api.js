import axios from "axios"

const url = process.env.VUE_APP_API_URL

axios.defaults.headers.common[process.env.VUE_APP_API_KEY_NAME] = process.env.VUE_APP_API_KEY_VALUE

export default axios.create({
    baseURL: url
})