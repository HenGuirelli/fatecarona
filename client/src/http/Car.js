import Axios from 'axios'
import config from '../config.json'

const baseUrl = config.endpoint

class Car {
    static getCars({ email }){
        return Axios.get(baseUrl + '/veiculo/' + email)
    }

    static getCarByPlate(plate){
        return Axios.get(baseUrl + '/veiculo/placa/' + plate)
    }

    static deleteCar({ plate }) {
        return Axios.delete(baseUrl + '/veiculo/' + plate)
    }

    static createNewCar({ placa, marca, modelo, cor, email }){
        return Axios.post(baseUrl + '/veiculo', { placa, marca, modelo, cor, email })
    }
}

export default Car