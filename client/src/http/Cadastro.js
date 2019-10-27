import axios from "axios"
import config from '../config.json'

const baseUrl = config.endpoint

class Cadastro {
    static createNewUser({ email, senha }){
        return axios.post(baseUrl + '/conta', { email, senha })
    }
}

export default Cadastro