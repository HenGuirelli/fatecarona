const { GetNotificationsByEmail, GetNoVisualizedNotificationsByEmail } = require('../DAO/mongo')
const { Notification } = require('../notification')

const notificationController = app => {
    app.get('/notifications', (req, res, next) => {
        GetNotificationsByEmail(req.query.email)
        .then(result => res.send({ success: true, notifications: result }))
        .catch(err => res.send({ success: false, message: err }))
    })

    app.put('/notification/visualized/:email', (req, res, next) => {
        // var command = new NotificationVisualizedCommand({ ...req.params })
        // res.send(NotificationHandler.NotificationVisualized(command))
    })

    app.get('/notifications/latest', (req, res, next) => {
        GetNoVisualizedNotificationsByEmail(req.query.email)
        .then(result => res.send({ success: true, notifications: result }))
        .catch(err => res.send({ success: false, message: err }))
    })

    app.delete('/notification/:id', (req, res, next) => {
        const id = parseInt(req.params.id)
        Notification.delete({ notificationId: id })
        .then(result => res.send(result))
        .catch(err => res.send({ success: false, message: err }))
    })
}

exports.Notification = notificationController