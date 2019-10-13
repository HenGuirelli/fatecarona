const { atualizarPerfil, buscarPerfil } = require('./perfil')

function perfilEndpoint(app){
    app.put('/perfil', (req, res) => {
        atualizarPerfil(req.body, () => {
                res.send({ sucesso: true })
            },
            () => {
                res.send({ sucesso: false })
            })
           
    })

    app.get('/perfil/:email', (req, res) => {
        buscarPerfil(req.params, resultado => {
            res.send(resultado)
        })
    })
}

exports.perfil = perfilEndpoint