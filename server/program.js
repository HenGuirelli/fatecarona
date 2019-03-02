const express = require('express');
const app = express();

const config = require('./config.json').App
const port = config.port
app.use(express.json())

// Controllers
const { Members } = require('./controllers/membro')
const { Cars } = require('./controllers/car')
const { Trajeto } = require('./controllers/trajeto')
const { Carpool } = require('./controllers/carpool')

// Run controllers
Members(app)
Cars(app)
Trajeto(app)
Carpool(app)

// Run server
app.listen(port, () => {
    console.log(`Server on in port ${port}`);
});