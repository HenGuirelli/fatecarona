const  { UpdateNotification } = require ('../DAO/mysql')
const { Sync, Operation, action, actionDestination } = require('../DAO/sync')

const sync = Sync.getInstance()

class NotificationHandler {
    static createNewNotification(createNewNotificationCommand){
        // TODO: implementar esse metodo
    }

    static NotificationVisualized(notificationVisualizedCommand){
        const { email } = notificationVisualizedCommand
        const val = {
            visualized: true
        }

        UpdateNotification(val, email)
        sync.add(
            new Operation({ action: action.UPDATE, where: { from: email } ,values: { ...val } }), 
            actionDestination.NOTIFICATION
        )
        return { success: true }
    }
}

exports.NotificationHandler = NotificationHandler