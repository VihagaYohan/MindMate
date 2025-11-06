import axios, { AxiosError, AxiosInstance } from 'axios'
import { Endpoint } from './'

const axiosClient: AxiosInstance = axios.create({
    baseURL: new Endpoint().baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosClient