const { GetNotificationsByEmail } = require('../DAO/mongo')
const { NotificationVisualizedCommand  } = require('../commands/Notification/NotificationVisualizedCommand')
const { NotificationHandler } = require('../commandHandlers/NotificationHandler')

const notificationController = app => {
    app.get('/notifications', (req, res, next) => {
        GetNotificationsByEmail(req.query.email)
        .then(result => res.send({ success: true, notifications: result }))
        .catch(err => res.send({ success: false, message: err }))
    })

    app.put('/notification/visualized/:email', (req, res, next) => {
        var command = new NotificationVisualizedCommand({ ...req.params })
        res.send(NotificationHandler.NotificationVisualized(command))
    })
}

exports.Notification = notificationController