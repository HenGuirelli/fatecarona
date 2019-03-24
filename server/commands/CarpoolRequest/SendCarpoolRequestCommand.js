class SendCarpoolRequestCommand {
    constructor({ from, carpoolId, nameOrNick }){
        this.from = from
        this.carpoolId = carpoolId
        this.nameOrNick = nameOrNick
    }
}

exports.SendCarpoolRequestCommand = SendCarpoolRequestCommand