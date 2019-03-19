import Axios from 'axios'
import config from '../config.json'

const baseUrl = config.endpoint

class Carpool {
    static searchRequestCarpools({  date, email, hour }){
        return Axios.get(baseUrl + '/carpool/request/search', { params: { date, email, hour } })
    }

    /**
     * @param {json} data: {
    "email": "nome.sobrenome",
    "date": "03/03/2019",
    "hour": "20:31",
    "carPlate": "ADS-2349",
    "flowId": "585",
    "destination": "TO_FATEC",
    "isSmokerAllowed": "false",
    "isMusicAllowed": "false",
    "isWheelchairAccommodation": "false"
    }
     */
    static offerCarpool(data){
        return Axios.post(baseUrl + '/carpool/offer', { ...data })
    }

    static acceptCarpoolOffer({ driverEmail, riderEmail, carpoolId }){
        return Axios.post(baseUrl + '/carpool/accept', { driverEmail, riderEmail, carpoolId })
    }

    static iWantCarpool({ email, nameOrNick, carpoolId }) {
        return Axios.post(baseUrl + '/carpool/request', { email, nameOrNick, carpoolId })
    }

    static searchCarpool({ email, status }) {
        return Axios.get(baseUrl + '/carpool/search', { params: { email, status }})
    }
}

export default Carpool