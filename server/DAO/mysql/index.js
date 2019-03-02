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
    const keys   =  Object.keys(json)
    const values = Object.values(json)

    return `INSERT INTO 
                ${tableName}(${keys.map((item, index) => `${item}`) })
            VALUES (
                ${values.map((item, index) => `${wrapString(item)}`) }
            )`
}

const createSelectQuery = tableName => filter => {
    const keys   =  Object.keys(filter)

    return `SELECT * FROM
                ${tableName}
            WHERE 
                ${keys.map((item, index) => `${item} = ${wrapString(filter[item])}`) }
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
    console.log(query)
    return syncConnection.query(query)
}

const InsertInMembros = values => Insert('membros')(values)

const IsValidEmail = email => Select('membros')({ email }).length === 0

exports.InsertInMembros = InsertInMembros
exports.IsValidEmail = IsValidEmail