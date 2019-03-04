const { CreateNewCarpoolOfferCommand } = require('../commands/CarpoolOffer/CreateNewCarpoolOfferCommand')
const { CarpoolOfferHandler } = require('../commandHandlers/CarpoolOfferHandler')

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
            res.send('all carpooling for email ' + req.params.email)
        })
    }

    const Request = () => {
        // Search carpooling offers
        app.get('/carpool/request/:date/:hour/:trajeto_id/search', (req, res) => {
            const { hour, date, trajeto_id } = req.params
            res.send(`search carpool in ${hour} - ${date} trajeto id: ${trajeto_id}`)
        })

        // Request carpooling
        app.post('/carpool/request/:trajeto_target_id', (req, res) => {
            res.send('request carpool ' + req.params.trajeto_target_id)
        })
    }

    Offer()
    Request()
}

exports.Carpool = CarpoolController