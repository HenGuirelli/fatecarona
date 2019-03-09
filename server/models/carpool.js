const Member = require('./member')
const Flow = require('./flow')
const { Status } = require('../enum/carona')

class Carpool {
    constructor(){
        this.hour = ''
        this.date = ''
        this.destination = undefined // enum/car/destination        
        this.status = Status.PENDING // enum/carona/status

        this._preferences = undefined // models/preferences
        this._flow = undefined   // models/flow
        this._driver = undefined // models/member
        this._passengers = [] // models/member
    }

    set driver(val) {
        if ( !(val instanceof Member) ){
            throw `instancia de motorista incorreto.\nEsperado: 'Member'\nRecebido:${typeof val}`
        }
        this._driver = val
    }

    get driver(){
        return this._driver
    }

    set passengers(val) {
        if ( !(val instanceof Member) ){
            throw `instancia de passageiro incorreto.\nEsperado: 'Member'\nRecebido:${typeof val}`
        }
        this._passengers = val
    }

    get passengers(){
        return this._passengers
    }

    set flow(val){
        if ( !(val instanceof Flow) ){
            throw `instancia de trajeto incorreto.\nEsperado: 'Flow'\nRecebido:${typeof val}`
        }
        this._flow = val
    }

    get flow(){
        return this._flow
    }

    set preferences(val){
        if ( !(val instanceof Flow) ){
            throw `instancia de preferencia incorreto.\nEsperado: 'Preferences'\nRecebido:${typeof val}`
        }
        this._preferences = val
    }

    get preferences(){
        return this._preferences
    }
}

exports.Carpool = Carpool