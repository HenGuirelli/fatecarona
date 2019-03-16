import Axios from 'axios'
import config from '../config.json'

const baseUrl = config.endpoint

class Carpool {
    static searchCarpools({  date, email, hour }){
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
}

export default Carpool