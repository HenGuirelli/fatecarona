const { minutesDiff } = require('../utils')

const acceptableMinutesToMatch = 40

const isMatchValid = (flow1, flow2) => (
    minutesDiff(flow1.hour, flow2.hour, false) <= acceptableMinutesToMatch && 
    flow1.date === flow2.date &&
    flow1.email !== flow2.email
)

const match = (flow, candidates) => {
    return candidates.filter(item => isMatchValid(flow, item))
}

exports.match = match