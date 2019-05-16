const mongo = require('../DAO/mongo/core')
const { Singleton } = require('./singleton')

const actionDestination = mongo.schema

const action = {
    INSERT: 'INSERT',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE'
}

class Operation {
    constructor({ action, values, where = null }){
        this.action = action
        this.values = values
        this.where = where
    }

    set action (val){
        if ( action[val] ){
            this._action = val
        }else{
            throw `Acion ${val} inválida`
        }
    }

    get action(){
        return this._action
    }
}

class _Sync {
    constructor(){
        this.operations = []
    }

    add(operation, actionDestination){
        operation.collection = actionDestination
        if (operation.collection)
            this.operations.push(operation)
    }

    remove(){
        this.operations.pop()
    }

    async _run(){        
        setInterval(this.executeQueue, 300)
    }

    executeQueue() {
        if (this.operations.length > 0){
            this.operations.forEach(item => this._exec(item))
            this.clarQueue()
        }
    }

    clarQueue(){
        this.operations = []
    }

    async _exec(operation){
        console.log(operation)
        switch(operation.action) {
            case action.INSERT:
                mongo.Insert(operation.collection)(operation.values)
                break
            case action.UPDATE:
                mongo.Update(operation.collection)(operation.where, operation.values)
                break
            case action.DELETE:
                mongo.Delete(operation.collection)(operation.where)
                break
        }
    }
}

let instance = undefined

class Sync extends Singleton {

    static getInstance(){
        if (instance === undefined){
            instance = new _Sync()
            instance._run()
        }
        return instance
    }
}

exports.Sync = Sync
exports.Operation = Operation
exports.action = action
exports.actionDestination = actionDestination