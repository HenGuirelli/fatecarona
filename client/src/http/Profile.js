import axios from 'axios'
import config from '../config.json'

const baseUrl = config.endpoint

class Profile {
    static getProfileData({ email }){
        return axios.get(baseUrl + '/perfil/' + email)
    }

    static async saveProfile({ 
        nome,
        telefone,
        apelido,
        img,
        chegada,
        saida,
        motorista,
        cnh,
        validadeCNH,
        categoriaCNH,
        email 
    }) 
        {
        return axios.put(baseUrl + '/perfil', {
            nome,
            telefone,
            apelido,
            img,
            chegada,
            saida,
            motorista,
            cnh,
            validadeCNH,
            categoriaCNH,
            email,
        })
    }
}

export default Profile