const { InsertCarpoolOffer, AddRider } = require('../DAO/mysql')
const { CarExists, FlowExists, GetLastIdCarpool, RiderAlreadyInCarpool } = require('../DAO/mysql')
const { GetFlowById, GetCarByPlate, GetProfile, GetCarpoolById } = require('../DAO/mongo')
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
    static async acceptCarpoolRequest(acceptCarpoolRequestCommand) {
        // add nos passageiros (mysql e mongo)
        const id =  acceptCarpoolRequestCommand.carpoolId
        const email = acceptCarpoolRequestCommand.riderEmail
        const val = {
            id_carona: id,
            email_membro: email
        }
        if (RiderAlreadyInCarpool(email, id)) { throw 'Passageiro já está na carona' }
        AddRider(val)

        // TODO: área de critica, fazer contenção de erro
        const profile = await GetProfile( email )
        const carpool = await GetCarpoolById( id )
        const riders = carpool[0].riders || []
        riders.push(profile[0])
        sync.add( new Operation({ 
                    action: action.UPDATE, 
                    where: { id }, 
                    values:  { riders }
                }), actionDestination.CARPOOL)
        
        return { success: true }
        // TODO: remover a notificação (mysql e mongo)
    }

    static createNewCarpoolOffer(createNewCarpoolOfferCommand) {
        const id = generateId()
        const val = {
            dataCarona: createNewCarpoolOfferCommand.date,
            horaCarona: createNewCarpoolOfferCommand.hour,
            placa: createNewCarpoolOfferCommand.carPlate,
            trajeto: createNewCarpoolOfferCommand.flowId,
            destino: createNewCarpoolOfferCommand.destination, // enum/destination
            fumantes: createNewCarpoolOfferCommand.isSmokerAllowed, // boolean
            musica: createNewCarpoolOfferCommand.isMusicAllowed,  // boolean
            cadeirante: createNewCarpoolOfferCommand.isWheelchairAccommodation, // bolean
            email: createNewCarpoolOfferCommand.email,
            id
        }

        if (!CarExists(val.placa)){
            return { success: false, message: `Veiculo de placa ${val.placa} não existe` }
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