const { TypeCNH } = require('../../enum/car')
const { formatDateResolve } = require('../../utils')

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
            this._typeCNH = undefined
        }
        this._typeCNH = val
    }

    get typeCNH(){
        return this._typeCNH
    }

    set expirationDate(val) {
        try {
            this._expirationDate = formatDateResolve(val)
        }catch(e){
            this._expirationDate = undefined
        }
    }

    get expirationDate(){
        return this._expirationDate
    }
}

exports.UpdateProfileDataCommand = UpdateProfileDataCommand