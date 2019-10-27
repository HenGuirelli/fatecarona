import axios from 'axios'
import config from '../config.json'

const baseUrl = config.endpoint

class Notification {
    static getNotifications({ email }){
        return axios.get(baseUrl + '/notificacao/' + email)
    }

    static setVisualized({ email }){
        return axios.put(baseUrl + '/notifications/visualized/' + email)
    }
}

export default Notification