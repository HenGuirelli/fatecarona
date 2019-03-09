const express = require('express');
const app = express();

const config = require('./config.json').App
const port = config.port
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

// Controllers
const { Members } = require('./controllers/membro')
const { Cars } = require('./controllers/car')
const { Trajeto } = require('./controllers/trajeto')
const { Carpool } = require('./controllers/carpool')
const { Dev } = require('./controllers/dev')

// Run controllers
Members(app)
Cars(app)
Trajeto(app)
Carpool(app)
Dev(app)

// Run server
app.listen(port, () => {
    console.log(`Server on in port ${port}`);
});