const mongo = require('./core')


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
//     model: 'Palio'
// }
const GetCar = async email => {
    return mongo.Select('car')({ email })
}

exports.GetProfile = GetProfile
exports.GetFlow = GetFlow
exports.GetCar = GetCar