const { InsertCar, DeleteCar } = require('../DAO/mysql')
const { IsValidCar, EmailExists } = require('../DAO/mysql')
const { Sync, Operation, action, actionDestination } = require('../DAO/sync')

const sync = Sync.getInstance()

class CarHandler {
    static insertNewCar(insertNewCarCommand) {
        const val = {
            placa: insertNewCarCommand.plate,
            email: insertNewCarCommand.email,
            marca: insertNewCarCommand.brand,
            modelo: insertNewCarCommand.model,
            cor: insertNewCarCommand.color
        }

        if (!EmailExists(val.email)){
            return { success: false, message: `Email ${val.email} inválido` }
        }

        if (!IsValidCar(val.placa)){
            return { success: false, message: `Carro inválido: placa já cadastrada` }
        }
        
        InsertCar(val)
        sync.add(new Operation({ action: action.INSERT, values: { ...insertNewCarCommand } }), actionDestination.CAR)
        return { success: true }
    }

    static deleteCar(deleteCarCommand) {
        if(!IsValidCar(deleteCarCommand.plate)){
            DeleteCar(deleteCarCommand.plate)
            sync.add(new Operation({ action: action.DELETE, values: { ...deleteCarCommand } }), actionDestination.CAR)
            return { success: true }
        }
        return { success: false, message: `Veiculo com placa ${deleteCarCommand.plate} não encontrado` }
    }

}

exports.CarHandler = CarHandler