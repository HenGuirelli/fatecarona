const { inserirTrajeto, excluirTrajeto, buscarTrajeto } = require('./trajeto')

function trajetoEndpoint(app){
    app.post('/trajeto', (req, res) => {
        inserirTrajeto(req.body, result => {
            res.send(result)
        })
    })

    app.delete('/trajeto/:id', (req, res) => {
        excluirTrajeto(req.params, resultado => res.send(resultado))
    })

    app.get('/trajeto/:email', (req, res) => {
        buscarTrajeto(req.params, resultado => {
            res.send(resultado)
        })
    })
}

exports.trajeto = trajetoEndpoint