const { FinalizeCarpool } = require("../DAO/mysql")
const { Status } = require('../enum/carona')
const { Sync, Operation, action, actionDestination } = require('../DAO/sync')

const sync = Sync.getInstance()

class CarpoolHandler {
    static async finalizeCarpool(finalizeCarpoolCommand) {
        const id = parseInt(finalizeCarpoolCommand.id)
        FinalizeCarpool(id)
        sync.add( new Operation({ 
            action: action.UPDATE, 
            where: { id }, 
            values:  { status: Status.FINISHED }
        }), actionDestination.CARPOOL)
        return { success: true }
    }
}

exports.CarpoolHandler = CarpoolHandler