import axios from 'axios'
import config from '../config.json'

const baseUrl = config.endpoint

class Profile {
    static getProfileData({ email }){
        return axios.get(baseUrl + '/profile', { params: { email } })
    }

    static async saveProfile({email, nick, inFatec, outFatec, phone, isDriver, CNH, typeCNH, expirationDate }) {
        return axios.put(baseUrl + '/profile/' + email, {
            nick, inFatec, outFatec, phone, isDriver, CNH, typeCNH, expirationDate
        })
    }
}

export default Profile