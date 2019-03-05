class SendCarpoolRequestCommand {
    constructor({ email, carpoolId }){
        this.requesterEmail = email
        this.carpoolId = carpoolId
    }
}

exports.SendCarpoolRequestCommand = SendCarpoolRequestCommand