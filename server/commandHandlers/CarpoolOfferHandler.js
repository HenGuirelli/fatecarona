const { InsertCarpoolOffer } = require('../DAO/mysql')
const { CarExists, FlowExists, GetLastIdCarpool } = require('../DAO/mysql')
const { GetFlowById, GetCarByPlate } = require('../DAO/mongo')
const { Sync, Operation, action, actionDestination } = require('../DAO/sync')

const sync = Sync.getInstance()

const generateId = () => GetLastIdCarpool() + 3 // apenas para não ficar sequencia

const fetchJsonToMongo = json => {
    json.destination = json._destination
    delete json._destination
    if (json.flow){
        delete json.flowId
    }
    if (json.car){
        delete json.carPlate
    }
    json.riders = []
    return json
}

class CarpoolOfferHandler {
    static acceptCarpoolRequest(acceptCarpoolRequestCommand) {

    }

    static createNewCarpoolOffer(createNewCarpoolOfferCommand) {
        const id = generateId()
        const val = {
            data_carona: createNewCarpoolOfferCommand.date,
            hora_carona: createNewCarpoolOfferCommand.hour,
            placa_veiculo: createNewCarpoolOfferCommand.carPlate,
            trajeto: createNewCarpoolOfferCommand.flowId,
            destino: createNewCarpoolOfferCommand.destination, // enum/destination
            fumante: createNewCarpoolOfferCommand.isSmokerAllowed, // boolean
            musica: createNewCarpoolOfferCommand.isMusicAllowed,  // boolean
            cadeirante: createNewCarpoolOfferCommand.isWheelchairAccommodation, // bolean
            email: createNewCarpoolOfferCommand.email,
            id
        }

        if (!CarExists(val.placa_veiculo)){
            return { success: false, message: `Veiculo de placa ${val.placa_veiculo} não existe` }
        }

        if (!FlowExists(val.trajeto)){
            return { success: false, message: `Trajeto não encontrado` }
        }
        InsertCarpoolOffer(val)

        GetFlowById(createNewCarpoolOfferCommand.flowId)
        .then(flow => {
            GetCarByPlate(createNewCarpoolOfferCommand.carPlate)
            .then(car => 
                sync.add(new Operation({ 
                action: action.INSERT, 
                values: fetchJsonToMongo({ ...createNewCarpoolOfferCommand, id, flow: flow[0], car: car[0] }) 
            }), actionDestination.CARPOOL))    
        })

        
        return { success: true }
    }

    static refuseCarpoolRequest(RefuseCarpoolRequestCommand) {
        
    }
}

exports.CarpoolOfferHandler = CarpoolOfferHandler