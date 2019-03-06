const mongo = require('../mongo/core')

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
        this.data = []
    }

    add(operation, actionDestination){
        operation.collection = actionDestination
        if (operation.collection)
            this.data.push(operation)
    }

    remove(){
        this.data.pop()
    }

    async _run(){        
        setInterval(() => {
            if (this.data.length > 0){
                this.data.forEach(item => this._exec(item))
                this.data = []
            }
        }, 300)
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
                mongo.Delete(operation.collection)(operation.values)
                break
        }
    }
}

let instance = undefined

class Sync {
    constructor(){
        throw `Sync não pode ser instanciado. use o método getInstance()`
    }

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