const { CarpoolNotification } = require('./carpoolNotification')
const { Sync } = require('../DAO/sync')

class Services {
    static start(){
        console.log('inciando serviços')

        setTimeout(() => {
            CarpoolNotification.getInstance()
            console.log('Thread de notificação de caronas rodando')
        }, 500)

        setTimeout(() => {
            Sync.getInstance()
            console.log('Thread de sincronização entre os bancos rodando')
        }, 500)
        
        console.log('todos serviços inciados')
    }
}

exports.Services = Services 