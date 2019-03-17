import NotificationHttp from '../http/Notification'

const intervalToGetNotification = 10000 // 5seg

class Notificacao {
    static async run(email){
        setInterval( () => this.getNotifications(email), intervalToGetNotification)
    }

    static getNotifications(email){
        NotificationHttp.getNotifications({ email })
        .then(resolve => {
            const result = resolve.data
            if (result.success){
                console.log(result)
            }
        })
    }
}

export default Notificacao