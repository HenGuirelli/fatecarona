class InsertPersonalDataCommand {
    constructor({ nick, inFatec, outFatec, phone, email }){
        this.nick = nick
        this.inFatec = inFatec
        this.outFatec = outFatec
        this.phone = phone
        this.email = email
    }
}

exports.InsertPersonalDataCommand = InsertPersonalDataCommand