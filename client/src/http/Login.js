import axios from 'axios'
import config from '../config.json'

const baseUrl = config.endpoint

class Login {
    static createUser({ email, name }) {
        return axios.post(baseUrl + '/profile', { email, name })
    }

    static getUserData({ email }) {
        console.log('endpoint: ', baseUrl + '/profile/' + email)
        return axios.get(baseUrl + '/profile/' + email)
    }
}

export default Login 