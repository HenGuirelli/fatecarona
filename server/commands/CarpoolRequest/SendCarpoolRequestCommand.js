class SendCarpoolRequestCommand {
    constructor({ email, carpoolId, nameOrNick }){
        this.requesterEmail = email
        this.carpoolId = carpoolId
        this.nameOrNick = nameOrNick
    }
}

exports.SendCarpoolRequestCommand = SendCarpoolRequestCommand