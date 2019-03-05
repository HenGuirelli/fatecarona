const { CreateNewCarpoolOfferCommand } = require('../commands/CarpoolOffer/CreateNewCarpoolOfferCommand')
const { SendCarpoolRequestCommand } = require('../commands/CarpoolRequest/SendCarpoolRequestCommand')
const { CarpoolOfferHandler } = require('../commandHandlers/CarpoolOfferHandler')
const { CarpoolRequestHandler } = require('../commandHandlers/CarpoolRequestHandler')

const { GetCarpool, GetRequestCarpool } = require('../DAO/mongo')
const { match } = require('../carpool/match')

const CarpoolController = app => {
    const Offer = () => {
        // Add new carpooling offer
        app.post('/carpool/offer', (req, res) => {
            try{
                const command = new CreateNewCarpoolOfferCommand({ ...req.body })
                res.send(CarpoolOfferHandler.createNewCarpoolOffer(command))
            }catch (e){
                res.send({ success: false, message: e })
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
            .then(result => res.send(match({ hour, date, email }, result)))
            .catch(err => res.send({ success: false, message: err }))
        })

        // Request carpooling
        app.post('/carpool/request', (req, res) => {
            const command = new SendCarpoolRequestCommand({ ...req.body })
            res.send(CarpoolRequestHandler.sendCarpoolRequest(command))
        })
    }

    Offer()
    Request()
}

exports.Carpool = CarpoolController