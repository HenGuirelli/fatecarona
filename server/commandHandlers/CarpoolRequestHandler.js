const { GetEmailFromDriverByCarpoolId } = require('../DAO/mysql')
const { GetCarpoolById, GetProfile } = require('../DAO/mongo')
const { Sync, Operation, action, actionDestination } = require('../DAO/sync')
const config = require('../config.json')
const { TypeNotification } = require('../enum/carona')
const { Notification } = require('../notification')

const sync = Sync.getInstance()

// adiciona passageiros no mongo
// const resolveRidersToMongo = async ({id, email}) => {
//     let carpool  = await GetCarpoolById(id)
//     const member = await GetProfile(email)
//     if (carpool[0].riders){
//         carpool[0].riders.push(member[0])
//     }else{
//         carpool[0].riders = [member[0]]
//     }
//     sync.add(
//         new Operation({ action: action.UPDATE, where: { id }, values: { riders: carpool[0].riders }}), 
//         actionDestination.CARPOOL
//     )
// }

const fetchTypeNotificationToMongo = ({ typeNotification }) => {
    return Object.keys(TypeNotification)[typeNotification]
}

class CarpoolRequestHandler {
    static sendCarpoolRequest(sendCarpoolRequestCommand) {
        const val = {
            carpoolId: sendCarpoolRequestCommand.carpoolId,
            to: sendCarpoolRequestCommand.requesterEmail,
            from: GetEmailFromDriverByCarpoolId(sendCarpoolRequestCommand.carpoolId),
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