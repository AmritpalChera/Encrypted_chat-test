import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    timeout: 5000,
    credentials: 'include',

})

export default instance;