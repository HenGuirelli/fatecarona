const { InsertCarpoolOffer } = require('../DAO/mysql')
const { CarExists, FlowExists } = require('../DAO/mysql')

class CarpoolOfferHandler {
    static acceptCarpoolRequest(acceptCarpoolRequestCommand) {

    }

    static createNewCarpoolOffer(createNewCarpoolOfferCommand) {
        const val = {
            data_carona: createNewCarpoolOfferCommand.date,
            hora_carona: createNewCarpoolOfferCommand.hour,
            placa_veiculo: createNewCarpoolOfferCommand.carPlate,
            trajeto: createNewCarpoolOfferCommand.flowId,
            destino: createNewCarpoolOfferCommand.destination, // enum/destination
            fumante: createNewCarpoolOfferCommand.isSmokerAllowed, // boolean
            musica: createNewCarpoolOfferCommand.isMusicAllowed,  // boolean
            cadeirante: createNewCarpoolOfferCommand.isWheelchairAccommodation // bolean
        }

        if (!CarExists(val.placa_veiculo)){
            return { success: false, message: `Veiculo de placa ${val.placa_veiculo} não existe` }
        }

        if (!FlowExists(val.trajeto)){
            return { success: false, message: `Trajeto não encontrado` }
        }

        InsertCarpoolOffer(val)
        return { success: true }
    }

    static refuseCarpoolRequest(RefuseCarpoolRequestCommand) {
        
    }
}

exports.CarpoolOfferHandler = CarpoolOfferHandler