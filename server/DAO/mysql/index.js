const mysql = require('mysql')
const syncMysql = require('sync-mysql')
const { Status } = require('../../enum/carona')

const connectionConfig = {
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'bob@123',
    database : 'fatecarona'
}

const connection = mysql.createConnection(connectionConfig)
const syncConnection = new syncMysql(connectionConfig)

connection.connect(err =>{
    if(err) return console.log(err);
    console.log('conectou!');
})

const tableName = {
    FLOW: 'trajeto',
    MEMBER: 'membros',
    CAR: 'veiculos',
    WAYPOINTS: 'pontos_interesse',
    CARPOOL: 'caronas',
    RIDER: 'caronas_membros',
    NOTIFICATION: 'notification',
    RATE: 'rating',
    CARPOOLSHEDULED: 'carona_agendada'
}

const wrapString = val => {
    if (typeof val === 'string')
        return `'${val}'` 
    else if(typeof val === 'boolean') 
        return val ? 1 : 0
    else if (val == undefined)
        return 'null'
    else
        return val
}

const createInsertQuery = tableName => values => {
    if ( !(values instanceof Array) ){
        const keys = Object.keys(values)
        const _values = Object.values(values)
        return `INSERT INTO 
                    ${tableName}(${keys.map((item, index) => `\`${item}\``) })
                VALUES (
                    ${_values.map((item, index) => `${wrapString(item)}`) }
                )`
    }else{
        // TODO: insert em varias linhas
    }
}

const createSelectQuery = tableName => filter => {
    const keys =  Object.keys(filter)

    if (filter){
        return `SELECT * FROM
                    ${tableName}
                WHERE 
                    ${
                        keys.map((item, index) => `${item} = ${wrapString(filter[item])} ${index != keys.length - 1 ? 'AND': '' } `)
                        .toString().replace(',', '')
                    }    
                `
    }
    else{
        return `SELECT * FROM ${tableName}`
    }
}

const createUpdateQuery = tableName => (values, whereColum, whereValue) => {
    const keys  = Object.keys(values)

   return `UPDATE 
                \`${tableName}\` 
            SET
                ${keys.map((item, index) => `\`${ item }\` = ${ wrapString(values[item]) }`) }
            WHERE
                \`${whereColum}\` = ${wrapString(whereValue)}
            `
}

const Insert = tableName => values => {
    const createQuery = createInsertQuery(tableName)
    console.log(createQuery(values))
    return connection.query(createQuery(values), (error, results, fields) => {
        if (error){
           console.log(error);
        }
    })
}

const Select = tableName => filter => {
    const query = createSelectQuery(tableName)(filter)
    console.log(query)
    return syncConnection.query(query)
}

const Update = tableName => (values, whereColum, whereValue) => {
    const query = createUpdateQuery(tableName)(values, whereColum, whereValue)
    return connection.query(query, (error, results, fields) => {
        if (error)
          console.log(error);
   })
}

const Delete = tableName => (whereColum, whereValue) => {
    const query = `DELETE FROM ${tableName} WHERE ${whereColum} = ${wrapString(whereValue)}`
    return connection.query(query, (error, results, fields) => {
        if (error)
            console.log(error) 
    })
}

// validações
const IsValidEmailForInsert = email => Select(tableName.MEMBER)({ email }).length === 0
const IsValidEmailForUpdate = email => Select(tableName.MEMBER)({ email }).length >= 1
const EmailExists = email => Select(tableName.MEMBER)({ email }).length > 0
const IsValidCar = plate => Select(tableName.CAR)({ placa: plate }).length === 0
const GetFlowNumRows = () => {
    const result = syncConnection.query(`SELECT id FROM ${tableName.FLOW} order by id desc limit 1`)
    return result.length > 0 ? result[0].id : 0
}
const WayPointExists = id => syncConnection.query(`SELECT COUNT(*) as numrow from ${tableName.WAYPOINTS} WHERE id_trajeto = ${id}`)[0].numrow > 0
const CarExists = plate => Select(tableName.CAR)({ placa: plate }).length > 0
const FlowExists = id => Select(tableName.FLOW)({ id }).length > 0
const GetLastIdCarpool = () => { 
    try {
        return syncConnection.query(`SELECT id FROM ${tableName.CARPOOL} order by id desc limit 1`)[0].id
    } catch(e){
        return 0
    }
}
const GetEmailFromDriverByCarpoolId = carpoolId => {
    try{
        return Select(tableName.CARPOOL)({ id: carpoolId })[0].email
    }catch(e){
        return -1
    }
}
const RiderAlreadyInCarpool = (email, carpoolId) => {
    const result = Select(tableName.RIDER)({ email_membro: email, id_carona: carpoolId })
    if (result instanceof Array){
        return result.length > 0
    }else{
        return result
    }
}

// ações
const InsertInMembros = values => Insert(tableName.MEMBER)(values)
const UpdateMembros = (values, email) => Update(tableName.MEMBER)(values, 'email', email)
const UpdateFlow = (values, id) => Update(tableName.FLOW)(values, 'id', id)
const UpdateWaypoints = (values, idFlow) => {
    Delete(tableName.WAYPOINTS)('id_trajeto', idFlow)
    const insert = Insert(tableName.WAYPOINTS)
    values.forEach(item => insert({ ponto: item, id_trajeto: idFlow }))
}
const InsertCar = values => Insert(tableName.CAR)(values)
const InsertFlow = values => {
    const { pontos_interesse, ...flow } = values
    Insert(tableName.FLOW)(flow)
    if (pontos_interesse && pontos_interesse.length > 0)
        InsertWaypoints(pontos_interesse, flow.id)   
}
const InsertWaypoints = (waypoints, id) => {
    const query = `INSERT INTO ${tableName.WAYPOINTS}(id_trajeto, ponto) values ${waypoints.map(item => `(${id}, ${wrapString(item)})` )}`
    connection.query(query, (error, results, fields) => {
        if (error)
          throw error;
   })
}
const DeleteCar = plate => Delete(tableName.CAR)('placa', plate)
const DeleteFlow = id => Delete(tableName.FLOW)('id', id)
const DeleteWaypoints = idFlow => Delete(tableName.WAYPOINTS)('id_trajeto', idFlow)
const InsertCarpoolOffer = values => Insert(tableName.CARPOOL)(values)
const InsertPassageiro = values => Insert(tableName.RIDER)(values)
const InsertNotification = values => Insert(tableName.NOTIFICATION)(values)
const UpdateNotification = (values, email) => Update(tableName.NOTIFICATION)(values, 'from', email)
const AddRider = (values) => Insert(tableName.RIDER)(values)
const GetLastIdNotification = () => {
    const result = syncConnection.query(`
        select id from ${tableName.NOTIFICATION} order by id desc limit 1 `)
    if ( result instanceof Array ){
        if (result.length === 0)
            return 0
        return result[0].id
    }
    try {
        return result.id
    }catch (e){
        return result
    }
}
const DeleteNotification = id => Delete(tableName.NOTIFICATION)('id', id)
const StartCarpool = id => Update(tableName.CARPOOL)({ status: Status.ACTIVE }, 'id', id)
const FinalizeCarpool = id => Update(tableName.CARPOOL)({ status: Status.FINISHED }, 'id', id)
const InsertNewRate = values => Insert(tableName.RATE)(values)
const InsertCarpoolOfferSheduled = values => Insert(tableName.CARPOOLSHEDULED)(values)

exports.InsertCarpoolOfferSheduled = InsertCarpoolOfferSheduled
exports.InsertNewRate = InsertNewRate
exports.StartCarpool = StartCarpool
exports.FinalizeCarpool = FinalizeCarpool
exports.DeleteNotification = DeleteNotification
exports.GetLastIdNotification = GetLastIdNotification
exports.AddRider = AddRider
exports.UpdateNotification = UpdateNotification
exports.GetEmailFromDriverByCarpoolId = GetEmailFromDriverByCarpoolId
exports.InsertInMembros = InsertInMembros
exports.InsertNotification = InsertNotification
exports.IsValidEmailForInsert = IsValidEmailForInsert
exports.IsValidEmailForUpdate = IsValidEmailForUpdate
exports.IsValidCar = IsValidCar
exports.InsertCar = InsertCar
exports.UpdateMembros = UpdateMembros
exports.InsertCar = InsertCar
exports.EmailExists = EmailExists
exports.CarExists = CarExists
exports.GetFlowNumRows = GetFlowNumRows
exports.InsertFlow = InsertFlow
exports.DeleteCar = DeleteCar
exports.DeleteFlow = DeleteFlow
exports.DeleteWaypoints = DeleteWaypoints
exports.UpdateFlow = UpdateFlow
exports.UpdateWaypoints = UpdateWaypoints
exports.WayPointExists = WayPointExists
exports.InsertWaypoints = InsertWaypoints
exports.InsertCarpoolOffer = InsertCarpoolOffer
exports.FlowExists = FlowExists
exports.InsertPassageiro = InsertPassageiro
exports.GetLastIdCarpool = GetLastIdCarpool
exports.RiderAlreadyInCarpool = RiderAlreadyInCarpool
