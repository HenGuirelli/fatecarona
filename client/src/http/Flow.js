import Axios from 'axios'
import config from '../config.json'

const baseUrl = config.endpoint

class Flow {
    static createNewFlow({ email, name, origin, destination, waypoints = [] }) {
        return Axios.post(baseUrl + '/trajeto', {
            email, name, origin, destination, waypoints
        })
    }

    static getFlows({ email }) {
        return Axios.get(baseUrl + '/trajeto', {
            params: { email }
        })
    }

    static deleteFlow({ id }) {
        return Axios.delete(baseUrl + '/trajeto/' + id)
    }
}

export default Flow