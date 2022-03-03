import axios from 'axios'

export const cargoApi = axios.create({
    baseURL: 'http://apitest.cargofive.com/api',
})
