const TypeCNH = require('../enum/car')

class Driver {
    constructor(){
        this.CNH = '',
        this.typeCNH = TypeCNH.UNDEFINED, // enum/car
        this.expirationDate = ''
    }
}

exports.Driver = Driver