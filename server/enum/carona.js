const TypeCarpool = {
    DRIVER: 'DRIVER',
    RIDER: 'RIDER'
}

const Destination = {
    TO_FATEC: 'TO_FATEC',
    OUT_FATEC: 'OUT_FATEC'
}

const Status = {
    ACTIVE: 'ACTIVE',
    PENDING: 'PENDING',
    FINISHED: 'FINISHED'
}

const TypeNotification = {
    CARPOOL: 0,
    CARPOOL_REQUEST: 1,
    MESSAGE: 2
}

const Weekday = {
    DOMINGO: 0,
    SEGUNDA: 1,
    TERCA: 2,
    QUARTA: 3,
    QUINTA: 4,
    SEXTA: 5,
    SABADO: 6
}

exports.Weekday = Weekday
exports.TypeCarpool = TypeCarpool
exports.Destination = Destination
exports.Status = Status
exports.TypeNotification = TypeNotification