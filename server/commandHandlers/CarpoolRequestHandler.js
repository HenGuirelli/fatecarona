const { InsertPassageiro } = require('../DAO/mysql')

class CarpoolRequestHandler {
    static sendCarpoolRequest(sendCarpoolRequestCommand) {
        const val = {
            id_carona: sendCarpoolRequestCommand.carpoolId,
            email_membro: sendCarpoolRequestCommand.requesterEmail
        }

        InsertPassageiro(val)
        return { success: true }
    }
}

exports.CarpoolRequestHandler = CarpoolRequestHandler