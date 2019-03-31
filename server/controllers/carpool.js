const { CreateNewCarpoolOfferCommand } = require('../commands/CarpoolOffer/CreateNewCarpoolOfferCommand')
const { CreateNewCarpoolOfferSheduledCommand } = require('../commands/CarpoolOffer/CreateNewCarpoolOfferSheduledCommand')
const { SendCarpoolRequestCommand } = require('../commands/CarpoolRequest/SendCarpoolRequestCommand')
const { AcceptCarpoolRequestCommand } = require('../commands/CarpoolOffer/AcceptCarpoolRequestCommand')
const { FinalizeCarpoolCommand } = require('../commands/Carpool/FinalizeCarpoolCommand')
const { CarpoolOfferHandler } = require('../commandHandlers/CarpoolOfferHandler')
const { CarpoolRequestHandler } = require('../commandHandlers/CarpoolRequestHandler')
const { CarpoolHandler } = require('../commandHandlers/CarpoolHandler')

const { GetCarpool, GetRequestCarpool, GetCarpoolByStatusOrAll, GetCarpoolById, GetPeoplesInCarpool } = require('../DAO/mongo')
const { match } = require('../carpool/match')

const CarpoolController = app => {
    const Offer = () => {
        // Add new carpooling offer
        app.post('/carpool/offer', (req, res) => {
            const { repeat } = req.body
            if (repeat){
                const command = new CreateNewCarpoolOfferSheduledCommand(req.body)
                res.send(CarpoolOfferHandler.createNewCarpoolScheduledOffer(command))
            }else{
                const command = new CreateNewCarpoolOfferCommand({ ...req.body })
                res.send(CarpoolOfferHandler.createNewCarpoolOffer(command))
            }
        })

        // Delete offer carpooling
        app.delete('/carpool/offer/:offer_id', (req, res) => {
            res.send('delete carpooling offer')
        })

        // Get all carpooling offer by user email
        app.get('/carpool/offer/:email', (req, res) => {
            GetCarpool(req.params.email)
            .then(result => res.send(result))
            .catch(err => res.send({ success: false, message: err }))
        })
    }

    const Request = () => {
        // Search carpooling offers
        app.get('/carpool/request/search', (req, res) => {
            const { date, email, hour } = req.query
            GetRequestCarpool(date, email)
            .then(result => res.send({ success: true, matches: match({ hour, date, email }, result) }))
            .catch(err => res.send({ success: false, message: err }))
        })

        // Request carpooling
        app.post('/carpool/request', (req, res) => {
            // try {
                const command = new SendCarpoolRequestCommand({ ...req.body })
                res.send(CarpoolRequestHandler.sendCarpoolRequest(command))
            // }catch (e){
            //     res.send({ success: false, message: e })
            // }
        })
    }

    // accept carpool request
    app.post('/carpool/accept', (req, res, next) => {
        /**
         * body: driveremail, rideremail, carpoolId,
         */
        var command = new AcceptCarpoolRequestCommand({ ...req.body })
        CarpoolOfferHandler.acceptCarpoolRequest(command)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send({ success: false, message: err })
        })
    })

    // parametros: email, status
    // status opcional, caso não informado irá trazer todas as caronas do usuario com o email informado
    app.get('/carpool/search', (req, res, next) => {
        GetCarpoolByStatusOrAll({ ...req.query })
        .then(result => res.send({ success: true, carpool: result }))
        .catch(err => res.send({ success: false, message: err.toString() }))
    })

    app.get('/carpool/search/id', (req, res, next) => {
        GetCarpoolById(parseInt(req.query.id))
        .then(result => {
            if(result.length > 0){ 
                res.send({ success: true, carpool: result[0] }) 
            }else{
                res.send({ success: false, message: `id ${req.query.id} inválido` }) 
            }          
        })
        .catch(err => res.send({ success: false, message: err.toString() }))
    })

    // finaliza a carona
    app.post('/carpool/finalize/:id', (req, res, next) => {
        const command = new FinalizeCarpoolCommand({ id: req.params.id })
        CarpoolHandler.finalizeCarpool(command)
        .then(result => res.send(result))
        .catch(err => res.send({ success: false, message: err.toString() }))
    })

    // retorna todas as pessoas na carona informada (motorista + caronista)
    // parametro: carpoolId
    app.get('/carpool/peoples', (req, res, next) => {
        const carpoolId = parseInt(req.query.carpoolId)
        GetPeoplesInCarpool(carpoolId)
        .then(result => res.send({ success: true, peoples: result }))
        .catch(err => res.send({ success: false, message: err.toString() }))
    })

    Offer()
    Request()
}

exports.Carpool = CarpoolController