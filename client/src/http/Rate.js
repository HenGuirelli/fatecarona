import Axios from 'axios'
import config from '../config.json'

const baseUrl = config.endpoint


class Rate {
    static async rateUser({ raterEmail, ratedEmail, comment, stars }) {
        return Axios.post(baseUrl + '/rating', { raterEmail, ratedEmail, comment, stars })
    }
}

export default Rate