import axios from 'axios'

const login = (user) => {
    return axios.post(import.meta.env.VITE_URL_API + "/users/login", user)
}

const createUser = (user) => {
    return axios.post(import.meta.env.VITE_URL_API+"/users/register", user);
} 

export default {
    login,
    createUser
}