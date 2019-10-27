const { buscarNotificacao } = require('./notificacao')

function notificacaoEndpoint(app){
    app.get('/notificacao/:email', (req, res) => {
        buscarNotificacao(req.params.email, resultado => {
            res.send(resultado)
        })
    })
}

exports.notificacao = notificacaoEndpoint