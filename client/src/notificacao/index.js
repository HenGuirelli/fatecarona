import NotificationHttp from '../http/Notification'

const intervalToGetNotification = 1000 // 10seg

class _Notificacao {

    constructor(){
        this.running = false
        this.email = null
    }

    run(email, cb){
        this.running = true
    }

    getNotifications(email, cb){
        email = this.email || email
        console.log('escolhido: ', email)
        NotificationHttp.getNotifications({ email })
        .then(resolve => {
            const result = resolve.data
            if (result.success){
                if (cb) cb(result.notifications)
            }
        })
    }
}

const instance = new _Notificacao()

class Notificacao {
    constructor(){
        throw 'Notificacao não pode ser instanciado'
    }

    static getInstance(){
        return instance
    }
}

export default Notificacao