const CarsController = app => {
    app.get('/car/:email', (req, res) => {
        res.send('get all cars by email')
    })

    app.post('/car/:email', (req, res) => {
        res.send('insert new car')
    })

    app.put('/car/:id/:email', (req, res) => {
        res.send('update car')
    })
}

exports.Cars = CarsController