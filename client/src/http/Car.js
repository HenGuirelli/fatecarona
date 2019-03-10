import Axios from 'axios'
import config from '../config.json'

const baseUrl = config.endpoint

class Car {
    static getCars({ email }){
        return Axios.get(baseUrl + '/car', { params: { email }})
    }

    static deleteCar({ plate }) {
        return Axios.delete(baseUrl + '/car', {
            data: { plate }
        })
    }

    static createNewCar({ plate, brand, model, color, email }){
        console.log ({ plate, brand, model, color, email })
        return Axios.post(baseUrl + '/car', { plate, brand, model, color, email })
    }
}

export default Car