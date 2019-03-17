import axios from 'axios'
import config from '../config.json'

const baseUrl = config.endpoint

class Notification {
    static getNotifications({ email }){
        return axios.get(baseUrl + '/notifications', { params: { email } })
    }
}

export default Notification