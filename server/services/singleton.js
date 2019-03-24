class Singleton {
    constructor(){
        throw "Impossivel instanciar uma classe singleton, utilize 'getInstance()'"
    }

    static getInstance() {
        throw "Nessária sobrescrita do método getInstance()"
    }
}

exports.Singleton = Singleton