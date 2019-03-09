const { formatDate } = require('../../utils')
const {TypeCNH} = require('../../enum/car')
class InsertDriverInformatinCommand {
    constructor({ isDriver, CNH, typeCNH, expirationDate, email }){
        this.isDriver = isDriver // boolean
        this.CNH = CNH
        this.typeCNH  = typeCNH // enum/car
        this.expirationDate = expirationDate
        this.email = email
    }

    set expirationDate(val){
        this._expirationDate = formatDate(val)
    }

    get expirationDate(){
        return this._expirationDate
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
}

exports.InsertDriverInformatinCommand = InsertDriverInformatinCommand