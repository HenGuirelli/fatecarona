import axios from 'axios'
import config from '../config.json'

const baseUrl = config.endpoint

class Login {
    static logar({ email, senha }) {
        return axios.post(baseUrl + '/conta/logar', { email, senha  })
    }
}

export default Login 