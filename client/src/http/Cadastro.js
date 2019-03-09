import Axios from "axios"

import config from '../config.json'

const baseUrl = config.endpoint

class Cadastro {
    static createNewUser({ email, name }){
        return Axios.post(baseUrl + '/profile', { email, name })
    }
}

export default Cadastro