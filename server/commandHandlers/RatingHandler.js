const { InsertNewRate } = require('../DAO/mysql')
const { Sync, Operation, action, actionDestination } = require('../DAO/sync')

const sync = Sync.getInstance()


class RatingHandler {
    static async RateUser(rateUserCommand) {
        InsertNewRate(rateUserCommand)
        sync.add( new Operation({ 
            action: action.INSERT,
            values:  { ...rateUserCommand }
        }), actionDestination.RATE)
    }
}

exports.RatingHandler = RatingHandler