import Axios from 'axios'
import config from '../config.json'

const baseUrl = config.endpoint

class Flow {
    static createNewFlow({ email, name, origin, destination, waypoints = [] }) {
        return Axios.post(baseUrl + '/trajeto', {
            email, nome: name, origem: origin, destino: destination, pontos_de_interesse: waypoints
        })
    }

    static getFlows({ email }) {
        return new Promise((resolve, reject) => {
            Axios.get(baseUrl + '/trajeto/' + email)
            .then(result => {
                resolve({ 
                    data: result.data.resultado.map(
                        trajeto => ({ 
                            email, 
                            name: trajeto.nome, 
                            origin: trajeto.origem, 
                            destination: trajeto.destino, 
                            waypoints: trajeto.pontos_de_interesse,
                            id: trajeto.id
                        })
                    )
                })
            })
            .catch(_ => reject(_))
        })
    }

    static deleteFlow({ id }) {
        return Axios.delete(baseUrl + '/trajeto/' + id)
    }
}

export default Flow