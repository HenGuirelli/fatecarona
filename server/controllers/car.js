const { InsertCarInformatinCommand } = require('../commands/Profile/InsertCarInformatinCommand')
const { DeleteCarCommand } = require('../commands/Car/DeleteCarCommand')
const { CarHandler } = require('../commandHandlers/CarHandler')

const CarsController = app => {
    // get all cars
    app.get('/car/:email', (req, res) => {
        res.send('get all cars by email')
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