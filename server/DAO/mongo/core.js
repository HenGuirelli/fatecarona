const MongoClient = require('mongodb').MongoClient;
let mongo;

const url = 'mongodb://localhost:27017/fatecarona'

const schema = {
    PROFILE: 'profile',
    FLOW: 'flow',
    CAR: 'car',
    CARPOOL: 'carpool',
    NOTIFICATION: 'notification',
    CHAT: 'chat',
    RATE: 'rate',
    CARPOOL_SHEDULED: 'carpool_sheduled'
}

const collectionsName = Object.values(schema)

const IsValidCollection = collectionName => collectionsName.includes(collectionName)

MongoClient.connect(url, { poolSize: 10 }, (err, db) => {
    if(err) {
        console.log(err);
        process.exit();
    }
    console.log('mongo conectado')
    mongo = db;
    //   Insert('profile')({ email: 'henrique.guirelli' })
    //   Update('profile')({ email: 'henrique.guirelli' }, { email: 'abc' })
    //   Delete('profile')()
    //   Select('profile')({ email: 'abc' }, (result) => console.log(result))
});


const Insert = collection => document => {
    if (!mongo) { console.log('mongo não conectado'); return;}
    console.log('insert ' + collection)

    if (IsValidCollection(collection)){
        return mongo.collection(collection).insert(document)
    }else{
        throw `Nome da coleção '${collection}' inválido`
    }
}

const Update = collection => (where, document) => {
    if (!mongo) { console.log('mongo não conectado'); return;}
    console.log('update ' + collection, where, {$set: document}, { multi: true })

    if (IsValidCollection(collection)){
        return mongo.collection(collection).update(where, {$set: document},  { multi: true })
    }else{
        throw `Nome da coleção '${collection}' inválido`
    }
}

const Select = collection => (where) => {
    if (!mongo) { console.log('mongo não conectado'); return;}
    if (IsValidCollection(collection)){
        return new Promise(resolve => mongo.collection(collection).find(where).toArray((err, result) => resolve (result)))
    }else{
        throw `Nome da coleção '${collection}' inválido`
    }
}

const Delete = collection => where => {
    if (!mongo) { console.log('mongo não conectado'); return;}
    if (IsValidCollection(collection)){
        return mongo.collection(collection).remove(where)
    }else{
        throw `Nome da coleção '${collection}' inválido`
    }
}

exports.Insert = Insert
exports.Update = Update
exports.Select = Select
exports.Delete = Delete

exports.schema = schema