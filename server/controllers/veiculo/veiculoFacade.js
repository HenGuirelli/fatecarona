const { criarVeiculo, deletarVeiculo, buscarVeiculo } = require('./veiculo')

function veiculoEndpoint(app){
    app.post('/veiculo', (req, res) => {
        criarVeiculo(req.body, () => {
                res.send({ sucesso: true })
            },
            () => {
                res.send({ sucesso: false })
            })
    })

    app.delete('/veiculo/:placa', (req, res) => {
        deletarVeiculo(req.params, result => {
            res.send(result)
        })
    })

    app.get('/veiculo/:email', (req, res) => {
        buscarVeiculo(req.params, result => {
            res.send(result)
        })
    })
}

exports.veiculo = veiculoEndpoint