import axios from "axios";
import router from "./router"

const api = axios.create();
//startRequest
api.interceptors.request.use(config => {
    if (localStorage.getItem('access_token')) {
        config.headers = {
            'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    }

    return config
}, error => {

})
//endRequest

//startResponse
api.interceptors.response.use(config => {
    if (localStorage.getItem('access_token')) {
        config.headers = {
            'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    }
    return config

}, error => {
    if (error.response.status === 401) {
        router.push({ name: 'user.login' })
    }

})

//endResponse
export default api