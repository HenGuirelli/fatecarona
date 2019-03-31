const { Destination } = require('../../enum/carona')
const { stringToBool, formatDateResolve } = require('../../utils')
const { Status } = require('../../enum/carona')

class CreateNewCarpoolOfferSheduledCommand {
    constructor({ hour, carPlate, flowId, destination, isSmokerAllowed, isMusicAllowed, isWheelchairAccommodation, email, weekdays }){
        this.hour = hour
        this.carPlate = carPlate
        this.flowId = parseInt(flowId)
        this.destination = destination // enum/destination
        this.isSmokerAllowed = stringToBool(isSmokerAllowed) // boolean
        this.isMusicAllowed = stringToBool(isMusicAllowed)  // boolean
        this.isWheelchairAccommodation = stringToBool(isWheelchairAccommodation) // bolean
        this.status = Status.PENDING
        this.email = email
        this.weekdays = weekdays
        this.repeat = true
    }

    set destination(val){
        if (Destination[val.toUpperCase()]){
            this._destination = val.toUpperCase()
        }else{
            throw 'Destino inválido'
        }
    }

    get destination(){
        return this._destination
    }
}

exports.CreateNewCarpoolOfferSheduledCommand = CreateNewCarpoolOfferSheduledCommand