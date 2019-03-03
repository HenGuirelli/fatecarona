const mysql = require('mysql')
const syncMysql = require('sync-mysql')

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

tableName = {
    FLOW: 'trajeto',
    MEMBER: 'membros',
    CAR: 'veiculos',
    WAYPOINTS: 'pontos_interesse' 
}

const wrapString = val => typeof val === 'string' ? `'${val}'` : val

const createInsertQuery = tableName => values => {
    if ( !(values instanceof Array) ){
        const keys = Object.keys(values)
        const _values = Object.values(values)
        return `INSERT INTO 
                    ${tableName}(${keys.map((item, index) => `${item}`) })
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
                    ${keys.map((item, index) => `${item} = ${wrapString(filter[item])}`) }    
                `
    }
    else{
        return `SELECT * FROM ${tableName}`
    }
}

const createUpdateQuery = tableName => (values, whereColum, whereValue) => {
    const keys  = Object.keys(values)

   return `UPDATE 
                ${tableName} 
            SET
                ${keys.map((item, index) => `${ item } = ${ wrapString(values[item]) }`) }
            WHERE
                ${whereColum} = ${wrapString(whereValue)}
            `
}

const Insert = tableName => values => {
    const createQuery = createInsertQuery(tableName)
    connection.query(createQuery(values), (error, results, fields) => {
         if (error)
           throw error;
    })
}

const Select = tableName => filter => {
    const query = createSelectQuery(tableName)(filter)
    return syncConnection.query(query)
}

const Update = tableName => (values, whereColum, whereValue) => {
    const query = createUpdateQuery(tableName)(values, whereColum, whereValue)
    return connection.query(query, (error, results, fields) => {
        if (error)
          throw error;
   })
}

const Delete = tableName => (whereColum, whereValue) => {
    const query = `DELETE FROM ${tableName} WHERE ${whereColum} = ${wrapString(whereValue)}`
    return connection.query(query, (error, results, fields) => {
        if (error)
            throw error 
    })
}

// validações
const IsValidEmailForInsert = email => Select(tableName.MEMBER)({ email }).length === 0
const IsValidEmailForUpdate = email => Select(tableName.MEMBER)({ email }).length >= 1
const EmailExists = email => Select(tableName.MEMBER)({ email }).length > 0
const IsValidCar = plate => Select(tableName.CAR)({ placa: plate }).length === 0
const GetFlowNumRows = () => syncConnection.query(`SELECT id FROM ${tableName.FLOW} order by id desc limit 1`)[0].id
const WayPointExists = id => syncConnection.query(`SELECT COUNT(*) as numrow from ${tableName.WAYPOINTS} WHERE id_trajeto = ${id}`)[0].numrow > 0

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

exports.InsertInMembros = InsertInMembros
exports.IsValidEmailForInsert = IsValidEmailForInsert
exports.IsValidEmailForUpdate = IsValidEmailForUpdate
exports.IsValidCar = IsValidCar
exports.InsertCar = InsertCar
exports.UpdateMembros = UpdateMembros
exports.InsertCar = InsertCar
exports.EmailExists = EmailExists
exports.GetFlowNumRows = GetFlowNumRows
exports.InsertFlow = InsertFlow
exports.DeleteCar = DeleteCar
exports.DeleteFlow = DeleteFlow
exports.DeleteWaypoints = DeleteWaypoints
exports.UpdateFlow = UpdateFlow
exports.UpdateWaypoints = UpdateWaypoints
exports.WayPointExists = WayPointExists
exports.InsertWaypoints = InsertWaypoints
