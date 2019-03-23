const { Singleton } = require('./singleton')
const { GetCarpoolByDate } = require('../DAO/mongo')
const { dateToString, fillZeros } = require('../utils')
const { Notification } = require('../notification')
const { TypeNotification } = require('../enum/carona')

const timeToCheckCarpools = 1000
const timeToCheckToRealodCarpools = 1000 
const acceptableTimeToSendNotification = 60 // in minutes

class CarpoolNotifcation {
    constructor(){
        this.carpools = []
    }

    async run() {
        this.carpools = await this._loadCarpools(new Date())
        setInterval(this._checkCarpools.bind(this), timeToCheckCarpools)
    }

    async _loadCarpools(date) {
        if ( !(date instanceof Date) ){
            throw `\n\nparametro date inválido\nesprado: Date.\nrecebido: ${typeof date}\n\n`
        }
        const result = await GetCarpoolByDate(dateToString(date, 'yyyy-mm-dd'))
        return this._fetchLoadedData(result)
    }

    _fetchLoadedData(data) {
        return data.map(item => ({ ...item, notificationSent: false }) )
    }

    _getCurrentTime() {
        const date = new Date()
        const hour = date.getHours().toString()
        const minutes = date.getMinutes().toString()
        return `${hour}:${fillZeros(2, minutes)}`
    }

    _calcDiffTime(hour1) {
        return hour2 => {
            const _hour1 = hour1.split(':')
            const _hour2 = hour2.split(':')

            const h1 = parseInt(_hour1[0])
            const m1 = parseInt(_hour1[1])
            const h2 = parseInt(_hour2[0])
            const m2 = parseInt(_hour2[1])
            return ((h2 - h1) * 60) + (m2 - m1)
        }
    }

    _sendNotifcation(carpool){
        const params = {
            title: 'Carona próxima',
            text: 'Você tem uma carona em menos de 1 hora',
            from: null,
            to: carpool.email,
            type: TypeNotification.CARPOOL,
            carpoolId: carpool.id,
            visualized: false
        }
        const notification = new Notification(params)
        notification.send()
        console.log('enviando notificação para motorista ' + carpool.email)
        carpool.notificationSent = true
    }

    _checkCarpools() {
        const now = this._getCurrentTime()
        const diff = this._calcDiffTime(now)
        for (let carpool of this.carpools){
            let shouldSendNotification = diff(carpool.hour) <= acceptableTimeToSendNotification && carpool.notificationSent === false
            if (shouldSendNotification){
                this._sendNotifcation(carpool)
            }            
        }
    }
}

let obj = undefined

class _CarpoolNotification extends Singleton {
    static getInstance(){
        if (obj === undefined){
            obj = new CarpoolNotifcation()
            obj.run()
            return obj
        }
        return obj
    }
}

exports.CarpoolNotification = _CarpoolNotification