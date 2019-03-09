const { InsertCarInformatinCommand } = require('../commands/Profile/InsertCarInformatinCommand')
const { DeleteCarCommand } = require('../commands/Car/DeleteCarCommand')
const { CarHandler } = require('../commandHandlers/CarHandler')

const { GetCar } = require('../DAO/mongo')

const CarsController = app => {
    // get all cars
    app.get('/car/:email', (req, res) => {
        GetCar(req.params.email)
        .then(result => res.send(result))
        .catch(err => res.send({ success: false, message: err }))
    })

    // insert new car
    app.post('/car/:email', (req, res) => {
        const command = new InsertCarInformatinCommand({ ...req.body })
        res.send(CarHandler.insertNewCar(command))
    })

    // delete car
    app.delete('/car', (req, res) => {
        const command = new DeleteCarCommand({ ...req.body })
        res.send(CarHandler.deleteCar(command))
    })
}

exports.Cars = CarsController