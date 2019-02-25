const TrajetoController = app => {
    app.get('/trajeto/:email', (req, res) => {
        res.send('get all trajetos')
    })

    app.post('/trajeto', (req, res) => {
        res.send('insert new trajeto')
    })

    app.put('/trajeto', (req, res) => {
        res.send('update trajeto')
    })

    app.delete('/trajeto/:id', (req, res) => {
        res.send('delete trajeto')
    })
}

exports.Trajeto = TrajetoController