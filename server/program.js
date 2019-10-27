const express = require('express')
const app = express()

const config = require('./config.json').App
const port = process.env.port || config.port
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    next()
})


// Controllers
 const { conta } = require('./controllers/conta/contaFacade')
 const { perfil } = require('./controllers/perfil/perfilFacade')
 const { veiculo } = require('./controllers/veiculo/veiculoFacade')
 const { trajeto } = require('./controllers/trajeto/trajetoFacade')
 const { carona } = require('./controllers/carona/caronaFacade')
 const { notificacao } = require('./controllers/notificacao/notificacaoFacade')

conta(app)
perfil(app)
veiculo(app)
trajeto(app)
carona(app)
notificacao(app)

// Run server
app.listen(port, () => {
    console.log(`Server on in port ${port}`)
})