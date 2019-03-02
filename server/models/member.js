const Driver = require('./driver')

const institutionalEmail = '@fatec.sp.gov.br'

class Member {
    constructor(){
        this.nick = '',
        this.inFatec = '',
        this.outFatec = '',
        this.phone = '',

        this._driver = undefined // model/driver
        this._email = ''
    }

    set email(val) {
        this._email = val.includes(institutionalEmail) ? val.replace(institutionalEmail, '') : val
    }

    get email() {
        return this._email
    }

    set driver(val) {
        if (!(val instanceof Driver)) {
            throw `tipo de objeto driver invalido.\nEsperado: Driver\nRecebido: ${typeof val}`
        }
        this._driver = val
    }

    get driver() {
        return this._driver
    }
}

exports.Member = Member
