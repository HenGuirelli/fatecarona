import Axios from 'axios'
import config from '../config.json'
import Car from './Car'

const baseUrl = config.endpoint

class Carpool {
    // caronas/procurar?data=2019-10-06&email={{ email_passagiero  }}&hora=12:50&eh_semanal=false
    static async searchRequestCarpools({  date, email, hour }){
        const resolve1 = await this.searchRequestCarpoolsNotWeekdays({ date, email, hour })
        const resolve2 = await this.searchRequestCarpoolsWeekdays({ date, email, hour })        


        for(var x of resolve1.data) {
            var rest = await Car.getCarByPlate(x.veiculo)
            x.veiculo = rest.data.result && rest.data.result[0] 
        }
        for(var x of resolve2.data) {
            var rest =  await Car.getCarByPlate(x.veiculo)
            x.veiculo = rest.data.result && rest.data.result[0]
        }

        return (resolve1.data.concat(resolve2.data))
    }

    static searchRequestCarpoolsNotWeekdays({  date, email, hour }){
        return Axios.get(baseUrl + '/caronas/procurar', { params: { data: date, email, hora: hour, eh_semanal: false } })
    }
    
    static searchRequestCarpoolsWeekdays({  date, email, hour }){
        return Axios.get(baseUrl + '/caronas/procurar', { params: { data: date, email, hora: hour, eh_semanal: true } })
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
        console.log(data)
        if (data.repeat) {
            const { weekdays } = data
            return Axios.post(baseUrl + '/carona/semanal', { 
                motorista: data.email,
                veiculo: data.carPlate,
                trajeto: data.flowId,
                data: data.date,
                hora: data.hour,
                destino: data.destination,
                permitido_fumar: data.isSmokerAllowed,
                permitido_musica_alta: data.isMusicAllowed,
                permitido_cadeira_rodas: data.isWheelchairAccommodation,

                segunda: weekdays.segunda,
                terca: weekdays.terca,
                quarta: weekdays.quarta,
                quinta: weekdays.quinta,
                sexta: weekdays.sexta,
                sabado: weekdays.sabado,
                domingo: weekdays.domingo,
            })
        }else {
            return Axios.post(baseUrl + '/carona', { 
                "motorista": data.email,
                "veiculo": data.carPlate,
                "trajeto": data.flowId,
                "hora": data.hour,
                "destino": data.destination,
                "permitido_fumar": data.isSmokerAllowed,
                "permitido_musica_alta": data.isMusicAllowed,
                "permitido_cadeira_rodas": data.isWheelchairAccommodation,
                "segunda": true,
                "terca": true,
                "quarta": true,
                "quinta": false,
                "sexta": false,
                "sabado": false,
                "domingo":  false
             })
        }
    }

    static acceptCarpoolOffer({ driverEmail, riderEmail, carpoolId }){
        return Axios.post(baseUrl + '/carpool/accept', { driverEmail, riderEmail, carpoolId })
    }

    static iWantCarpool({ from, nameOrNick, carpoolId }) {
        return Axios.put(baseUrl + '/carona/pedir/' + carpoolId, { email: from })
    }

    static searchCarpool({ email, status }) {
        return Axios.get(baseUrl + '/carpool/search', { params: { email, status }})
    }

    static getCarpoolById(id) {
        return Axios.get(baseUrl + '/carpool/search/id', { params: { id }})
    }

    static finalizeCarpool(id) {
        return Axios.post(baseUrl + '/carpool/finalize/' + id)
    }

    static getPeoplesInCarpool(id){
        return Axios.get(baseUrl + '/carpool/peoples', { params: { carpoolId: id } })
    }

    static pesquisarCaronas(email){
        return Axios.get(baseUrl + '/carona/' + email)
    }
}

export default Carpool