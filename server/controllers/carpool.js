const { CreateNewCarpoolOfferCommand } = require('../commands/CarpoolOffer/CreateNewCarpoolOfferCommand')
const { SendCarpoolRequestCommand } = require('../commands/CarpoolRequest/SendCarpoolRequestCommand')
const { AcceptCarpoolRequestCommand } = require('../commands/CarpoolOffer/AcceptCarpoolRequestCommand')
const { CarpoolOfferHandler } = require('../commandHandlers/CarpoolOfferHandler')
const { CarpoolRequestHandler } = require('../commandHandlers/CarpoolRequestHandler')

const { GetCarpool, GetRequestCarpool, GetCarpoolByStatusOrAll } = require('../DAO/mongo')
const { match } = require('../carpool/match')

const CarpoolController = app => {
    const Offer = () => {
        // Add new carpooling offer
        app.post('/carpool/offer', (req, res) => {
            // try{
                const command = new CreateNewCarpoolOfferCommand({ ...req.body })
                res.send(CarpoolOfferHandler.createNewCarpoolOffer(command))
            // }catch (e){
            //     res.send({ success: false, message: e })
            // }
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

    Offer()
    Request()
}

exports.Carpool = CarpoolController