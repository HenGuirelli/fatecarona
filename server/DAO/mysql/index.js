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

const wrapString = val => typeof val === 'string' ? `'${val}'` : val

const createInsertQuery = tableName => json => {
    const keys = Object.keys(json)
    const values = Object.values(json)

    return `INSERT INTO 
                ${tableName}(${keys.map((item, index) => `${item}`) })
            VALUES (
                ${values.map((item, index) => `${wrapString(item)}`) }
            )`
}

const createSelectQuery = tableName => filter => {
    const keys =  Object.keys(filter)

    return `SELECT * FROM
                ${tableName}
            WHERE 
                ${keys.map((item, index) => `${item} = ${wrapString(filter[item])}`) }
            `
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

const InsertInMembros = values => Insert('membros')(values)

const IsValidEmailForInsert = email => Select('membros')({ email }).length === 0
const IsValidEmailForUpdate = email => Select('membros')({ email }).length >= 1

const UpdateMembros = (values, email) => Update('membros')(values, 'email', email)

exports.InsertInMembros = InsertInMembros
exports.IsValidEmailForInsert = IsValidEmailForInsert
exports.IsValidEmailForUpdate = IsValidEmailForUpdate
exports.UpdateMembros = UpdateMembros

const Test = () => {
    console.log(createUpdateQuery('membros')({ motorista: 0, nick: 'batata' },  'email', 'hen.guirelli'))
}

Test()