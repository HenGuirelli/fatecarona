const { 
    inserirNovaCarona, 
    inserirNovaCaronaSemanal, 
    buscarCarona,
    buscarCaronaSemanal,
    deletarCarona,
    buscarTodasCaronas,
    pedirCarona,
    filtrarCaronas,
    aceitarPedidoDeCarona,
    finalizarCarona
 } = require('./carona')

function caronaFacade(app){
    app.post('/carona', (req, res) => {
        inserirNovaCarona(req.body, result => {
            res.send(result)
        })
    })

    app.post('/carona/semanal', (req, res) => {
        inserirNovaCaronaSemanal(req.body, result => {
            res.send(result)
        })
    })

    app.get('/carona/marcada/:email', (req, res) => {
        buscarCarona(req.params, resultado => {
            res.send(resultado)
        })
    })

    app.get('/carona/semanal/:email', (req, res) => {
        buscarCaronaSemanal(req.params, resultado => {
            res.send(resultado)
        })
    })

    app.get('/carona/:motorista', (req, res) => {
        buscarTodasCaronas(req.params, resultado => {
            res.send(resultado)
        })
    })

    app.delete('/carona/:id', (req, res) => {
        deletarCarona(req.params, resultado => {
            res.send(resultado)
        })
    })

    app.put('/carona/pedir/:id', (req, res) => {
        pedirCarona({ ...req.params, ...req.body }, resultado => {
            res.send(resultado)
        })
    })

    app.get('/caronas/procurar', (req, res) => {
        filtrarCaronas(req.query, resultado => {
            res.send(resultado)
        })
    })

    app.put('/carona/aceitar/:id', (req, res) => {
        aceitarPedidoDeCarona({ ...req.params, ...req.body }, resultado => {
            res.send(resultado)
        })
    })

    app.put('/carona/finalizar/:id', (req, res) => {
        finalizarCarona(req.params, resultado => {
            res.send(resultado)
        })
    })
}

exports.carona = caronaFacade