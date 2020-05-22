import axios from "axios"

const url = "http://localhost:2814/api"

export default axios.create({
    baseURL: url
})