const { RateUserCommand } = require('../commands/Rating/RateUserCommand')
const { RatingHandler } = require('../commandHandlers/RatingHandler')
const { GetRateByEmail } = require('../DAO/mongo')

const RatingController = app => {
    app.post('/rating', (req, res, next) => {
        try{
            const command = new RateUserCommand({ ...req.body })
            RatingHandler.RateUser(command)
            .then(result => res.send(result))
            .catch(err => res.send({ success: false, message: err.toString() }))
        }catch(e) {
            res.send({ success: false, message: e.toString() })
        }
    })

    // query: email
    app.get('/rating', (req, res, next) => {
        GetRateByEmail(req.query.email)
        .then(result => res.send({ success: true, rates: result }))
        .catch(err => res.send({ success: false, message: err.toString() }))
    })
}

exports.Rating = RatingController