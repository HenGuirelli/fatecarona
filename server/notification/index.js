const { InsertNotification, GetLastIdNotification, UpdateNotification, DeleteNotification } = require('../DAO/mysql')
const { Sync, Operation, action, actionDestination } = require('../DAO/sync')

const sync = Sync.getInstance()

class Notification {
    constructor({ title, text, to, from, type, carpoolId = null, visualized = false }){
        this.values = {
            title,
            text,
            to,
            from,
            type,
            carpoolId,
            visualized,
            id: Notification.generateId()
        }
    }

    async send(){
        const values = this.values
        InsertNotification(values)
        sync.add(
            new Operation({ action: action.INSERT, values }), 
            actionDestination.NOTIFICATION
        )
    }

    static generateId(){
        return GetLastIdNotification() + 3        
    }

    static async setVisualized({ email, visualized = true }){
        UpdateNotification({ visualized }, email)
        sync.add(
            new Operation({ action: action.UPDATE, where: { from: email } ,values: { visualized } }), 
            actionDestination.NOTIFICATION
        )
    }

    static async delete({ notificationId }){
        if (notificationId === undefined) {
            throw "notification id é obrigatório"
        }else{
            DeleteNotification(notificationId)
            sync.add(
                new Operation({ action: action.DELETE, where: { id: notificationId } }), 
                actionDestination.NOTIFICATION
            )

            return { success: true }
        }
    }
}

exports.Notification = Notification