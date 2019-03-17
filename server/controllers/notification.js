const { GetNotificationsByEmail } = require('../DAO/mongo')

const notificationController = app => {
    app.get('/notifications', (req, res, next) => {
        GetNotificationsByEmail(req.query.email)
        .then(result => res.send({ success: true, notifications: result }))
        .catch(err => res.send({ success: false, message: err }))
    })
}

exports.Notification = notificationController