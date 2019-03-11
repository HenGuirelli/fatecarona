import Axios from 'axios'
import config from '../config.json'

const baseUrl = config.endpoint

class FirstTimeEdittingProfile {
    static personalData({ email, nick, inFatec, outFatec, phone }){
        return Axios.put(baseUrl + '/profile/0/' + email, { data: { nick, inFatec, outFatec, phone } })
    }

    static driverData({ email, isDriver, CNH, typeCNH, expirationDate}) {
        return Axios.put(baseUrl + '/profile/1/' + email, { isDriver, CNH, typeCNH, expirationDate })
    }

    static carData({ email, plate, brand, model, color }){
        return Axios.put(baseUrl + '/profile/2/' + email, { plate, brand, model, color })
    }

    static flowData({ email, name, origin, destination, waypoints = [] }){
        return Axios.put(baseUrl + '/profile/3/' + email, { name, origin, destination, waypoints })
    }
}

export default FirstTimeEdittingProfile