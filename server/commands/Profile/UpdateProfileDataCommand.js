const { TypeCNH } = require('../../enum/car')
const { formatDate } = require('../../utils')

class UpdateProfileDataCommand {
    constructor({ nick, inFatec, outFatec, phone, isDriver, CNH, typeCNH, expirationDate, email }){
        this.nick = nick
        this.inFatec = inFatec
        this.outFatec = outFatec
        this.phone = phone

        this.isDriver = isDriver // boolean
        this.CNH = CNH
        this.typeCNH = typeCNH // enum/car
        this.expirationDate = expirationDate,
        this.email = email
    }

    set typeCNH(val){
        if ( !(TypeCNH[val])){
            throw `CNH inválida: ${val}`
        }
        this._typeCNH = val
    }

    get typeCNH(){
        return this._typeCNH
    }

    set expirationDate(val) {
        this._expirationDate = formatDate(val)
    }

    get expirationDate(){
        return this._expirationDate
    }
}

exports.UpdateProfileDataCommand = UpdateProfileDataCommand