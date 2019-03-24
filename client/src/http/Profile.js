import axios from 'axios'
import config from '../config.json'

const baseUrl = config.endpoint

class Profile {
    static getProfileData({ email }){
        return axios.get(baseUrl + '/profile', { params: { email } })
    }
}

export default Profile