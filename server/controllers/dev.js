const { Sync, Operation, action } = require('../services/sync')

const sync = Sync.getInstance()

const DevController = app => {
    app.get('/dev', (req, res) => {
        res.send('get in dev')
    })

    app.post('/dev', (req, res) => {
        sync.add(new Operation({ action: action.UPDATE, values: req.body }), 'caronas')
        res.send('post in dev')
    })
}

exports.Dev = DevController