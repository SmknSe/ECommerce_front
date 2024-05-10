import axios from "axios"
const BASE_URL = 'https://ecommerce-1dbp.onrender.com/api/'

export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})