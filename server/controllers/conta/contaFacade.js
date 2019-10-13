const { criarConta, logar } = require('./conta')

function contaEndpoint(app){
    app.post('/conta', (req, res) => {
            criarConta(req.body, () => {
                res.send({ sucesso: true })
            },
            () => {
                res.send({ sucesso: false })
            })
           
    })

    app.post('/conta/logar', (req, res) => {
        logar(req.body, resultado => {
            res.send(resultado)
        })
    })
}

exports.conta = contaEndpoint