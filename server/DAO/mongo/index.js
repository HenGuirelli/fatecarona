const mongo = require('./core')
const { Status } = require('../../enum/carona')

// Estrutura de retorno 
// {
//     _id: 'a31asd12312gbdf1231'
//     email: 'henrique.guirelli',
//     nick: 'nick',
//     inFatec: '10:00',
//     outFatec: '12:00',
//     phone: '12312313',
//     isDriver: true,
//     CNH: '123133',
//     typeCNH: 'A',
//     expirationDate: '03/10/2018'
// }
const GetProfile = async email => {
    return mongo.Select('profile')({ email })
}

// Estrutura de retorno
// {
//     name: 'trajeto 1',
//     origin: 'rua A',
//     destination: 'rua B',
//     waypoints: ['point A', 'point B', 'point C']
//     email: 'henrique.guirelli'
// }
const GetFlow = async email => {
    return mongo.Select('flow')({ email })
}

// Estrutura de retorno
// {
//     email: 'henrique.guirelli',
//     plate: 'ADS-123',
//     brand: 'Fiat',
//     model: 'Palio',
//     color: 'preto'
// }
const GetCar = async email => {
    return mongo.Select('car')({ email })
}

// Estrutura de retorno:
// {
//     id: 1,
//     date: "04/03/2018",
//     hour: "21:30",
//     plate: "ADS-234",
//     flow: 3,
//     email: "henrique.guirelli",
//     wheelchair: false,
//     smoker: false,
//     music: false,
//     status: "PENDING",
//     destination: "TO_FATEC"
//     riders: []
// }
const GetCarpool = async email => {
    return mongo.Select('flow')({ email })
}

// Estrutura de retorno:
// {
//     "_id": "5c7dd588d74cb4734cdb1419",
//     "id": 1,
//     "date": "04/03/2018",
//     "hour": "21:30",
//     "plate": "ADS-234",
//     "flow": 3,
//     "email": "henrique.guirelli",
//     "wheelchair": false,
//     "smoker": false,
//     "music": false,
//     "status": "PENDING",
//     "destination": "TO_FATEC"
//  }
const GetRequestCarpool = async (date, email) => {
    return mongo.Select('carpool')({ date, status: Status.PENDING , email: { $ne: email } })
}


const GetFlowById = async id => {
    return mongo.Select('flow')({ id })
}

const GetCarByPlate = async plate => {
    return mongo.Select('car')({ plate })
}

const GetCarpoolById = id => {
    return mongo.Select('carpool')({ id })
}

const GetNotificationsByEmail = async email => {
    return mongo.Select('notification')({ to: email })
}

const GetNoVisualizedNotificationsByEmail = async email => {
    return mongo.Select('notification')({ $and: [ { to: email, visualized: false } ]  })
}

const GetCarpoolByStatusOrAll = async ({ email, status }) => {
    const find = status ? { $or:  [ { email }, {riders: { $elemMatch: { email } } }] , status: status.toUpperCase() } : {  $or:  [ {email}, {riders: { $elemMatch: { email } } }] }
    return mongo.Select('carpool')(find)
}

exports.GetProfile = GetProfile
exports.GetFlow = GetFlow
exports.GetCar = GetCar
exports.GetCarpool = GetCarpool
exports.GetRequestCarpool = GetRequestCarpool
exports.GetFlowById = GetFlowById
exports.GetCarByPlate = GetCarByPlate
exports.GetCarpoolById = GetCarpoolById
exports.GetNotificationsByEmail = GetNotificationsByEmail
exports.GetNoVisualizedNotificationsByEmail = GetNoVisualizedNotificationsByEmail
exports.GetCarpoolByStatusOrAll = GetCarpoolByStatusOrAll