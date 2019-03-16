import Axios from 'axios'
import config from '../config.json'

const baseUrl = config.endpoint

class Carpool {
    static searchCarpools({  date, email, hour }){
        return Axios.get(baseUrl + '/carpool/request/search', { params: { date, email, hour } })
    }
}

export default Carpool