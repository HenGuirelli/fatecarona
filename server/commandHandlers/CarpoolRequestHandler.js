const { InsertPassageiro } = require('../DAO/mysql')
const { GetCarpoolById, GetProfile } = require('../DAO/mongo')
const { Sync, Operation, action, actionDestination } = require('../DAO/sync')


const sync = Sync.getInstance()

const resolveRidersToMongo = async ({id, email}) => {
    let carpool  = await GetCarpoolById(id)
    const member = await GetProfile(email)
    if (carpool[0].riders){
        carpool[0].riders.push(member[0])
    }else{
        carpool[0].riders = [member[0]]
    }
    sync.add(
        new Operation({ action: action.UPDATE, where: { id }, values: { riders: carpool[0].riders }}), 
        actionDestination.CARPOOL
    )
}

class CarpoolRequestHandler {
    static sendCarpoolRequest(sendCarpoolRequestCommand) {
        const val = {
            id_carona: sendCarpoolRequestCommand.carpoolId,
            email_membro: sendCarpoolRequestCommand.requesterEmail
        }

        InsertPassageiro(val)
        resolveRidersToMongo({ id: val.id_carona, email: val.email_membro })
        return { success: true }
    }
}

exports.CarpoolRequestHandler = CarpoolRequestHandler