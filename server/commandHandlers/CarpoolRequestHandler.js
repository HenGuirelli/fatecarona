const { GetEmailFromDriverByCarpoolId } = require('../DAO/mysql')
const { GetCarpoolById, GetProfile } = require('../DAO/mongo')
const { Sync, Operation, action, actionDestination } = require('../services/sync')
const config = require('../config.json')
const { TypeNotification } = require('../enum/carona')
const { Notification } = require('../notification')

const sync = Sync.getInstance()

class CarpoolRequestHandler {
    static sendCarpoolRequest(sendCarpoolRequestCommand) {
        const val = {
            carpoolId: sendCarpoolRequestCommand.carpoolId,
            to: GetEmailFromDriverByCarpoolId(sendCarpoolRequestCommand.carpoolId),
            from: sendCarpoolRequestCommand.from,
            title: config.texts.titleCarpool,
            text: config.texts.carpoolRequest.toString().replace(':rider', sendCarpoolRequestCommand.nameOrNick || ''),
            type: TypeNotification.CARPOOL_REQUEST,
            visualized: false // nova notificação sempre falsa
        }
        const notification = new Notification(val)
        notification.send()
        return { success: true }
    }
}

exports.CarpoolRequestHandler = CarpoolRequestHandler