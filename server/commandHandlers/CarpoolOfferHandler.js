const { InsertCarpoolOffer, AddRider, InsertCarpoolOfferSheduled, GetEmailFromDriverByCarpoolId } = require('../DAO/mysql')
const { CarExists, FlowExists, GetLastIdCarpool, RiderAlreadyInCarpool } = require('../DAO/mysql')
const { GetFlowById, GetCarByPlate, GetProfile, GetCarpoolById } = require('../DAO/mongo')
const { Sync, Operation, action, actionDestination } = require('../services/sync')
const { Weekday } = require('../enum/carona')
const { Notification } = require('../notification')
const { TypeNotification } = require('../enum/carona')
const config = require('../config.json')

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
        if (RiderAlreadyInCarpool(email, id)) { throw 'Você já está na carona' }
            AddRider(val)

        // TODO: área critica, fazer tratamento de erro
        const profile = await GetProfile( email )
        const carpool = await GetCarpoolById( id )
        const riders = carpool[0].riders || []
        riders.push(profile[0])
        sync.add( new Operation({ 
                    action: action.UPDATE, 
                    where: { id }, 
                    values:  { riders }
                }), actionDestination.CARPOOL)
        
        const from = GetEmailFromDriverByCarpoolId(id)
        const driverProfile = await GetProfile( from )
        const driverName = driverProfile[0].nick || driverProfile[0].name

        const notification = new Notification({
            carpoolId: id,
            title: config.texts.titleCarpool,
            from: from,
            to: email,
            text: config.texts.carpoolAcept.toString().replace(':driver', driverName ),
            type: TypeNotification.CARPOOL,
        })
        notification.send()

        return { success: true }
    }

    static async createNewCarpoolOffer(createNewCarpoolOfferCommand) {
        const id = generateId()
        const val = {
            dataCarona: createNewCarpoolOfferCommand.date || null,
            horaCarona: createNewCarpoolOfferCommand.hour,
            placa: createNewCarpoolOfferCommand.carPlate,
            trajeto: createNewCarpoolOfferCommand.flowId,
            destino: createNewCarpoolOfferCommand.destination, // enum/destination
            fumantes: createNewCarpoolOfferCommand.isSmokerAllowed, // boolean
            musica: createNewCarpoolOfferCommand.isMusicAllowed,  // boolean
            cadeirante: createNewCarpoolOfferCommand.isWheelchairAccommodation, // bolean
            email: createNewCarpoolOfferCommand.email,
            id,
            agendado: createNewCarpoolOfferCommand.repeat || false
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

        return { success: true, carpoolId: id }
    }

    static async createNewCarpoolScheduledOffer(createNewCarpoolOfferScheduledCommand) {
        const carpoolId = generateId()
        const weekdays = createNewCarpoolOfferScheduledCommand.weekdays
        const keys = Object.keys(weekdays)
        keys.forEach(key => {
            if (weekdays[key]){
                const weekdayId = this.getWeekdayId(key)
                InsertCarpoolOfferSheduled({ id_carona: carpoolId, id_dia_semana: weekdayId })
            }
        })
        GetFlowById(createNewCarpoolOfferScheduledCommand.flowId)
        .then(flow => {
            GetCarByPlate(createNewCarpoolOfferScheduledCommand.carPlate)
            .then(car => 
                sync.add( new Operation({ 
                    action: action.INSERT,
                    values: fetchJsonToMongo({ ...createNewCarpoolOfferScheduledCommand, flow: flow[0], car: car[0], id: carpoolId })
                }), actionDestination.CARPOOL_SHEDULED)
            )
        })
        return { success: true }
    } 

    static getWeekdayId(weekdayName){
        return Weekday[weekdayName.toUpperCase()]
    }

    static refuseCarpoolRequest(RefuseCarpoolRequestCommand) {
        
    }
}

exports.CarpoolOfferHandler = CarpoolOfferHandler