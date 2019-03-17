const express = require('express')
const app = express();

const config = require('./config.json').App
const port = process.env.port || config.port
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  })
  

// Controllers
const { Members } = require('./controllers/membro')
const { Cars } = require('./controllers/car')
const { Trajeto } = require('./controllers/trajeto')
const { Carpool } = require('./controllers/carpool')
const { Notification } = require('./controllers/notification')
const { Dev } = require('./controllers/dev')

// Run controllers
Members(app)
Cars(app)
Trajeto(app)
Carpool(app)
Notification(app)
Dev(app)

// Run server
app.listen(port, () => {
    console.log(`Server on in port ${port}`)
})