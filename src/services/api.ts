import { LoginType } from "../app/schema"
import axios from "axios"

const API_URL = "https://dummyjson.com"
const axiosHttp = axios.create({
    baseURL: `${API_URL}`,
})

const login = (data: LoginType) => {
    return axiosHttp.post(API_URL + "/auth/login", data)
}

const getProducts = () => {
    return axiosHttp.get(API_URL + "/products")
}

const getProductsById = (id: string) => {
    return axiosHttp.get(API_URL + "/products/" + id)
}

const api = {
    login,
    getProducts,
    getProductsById,
}
export default api
