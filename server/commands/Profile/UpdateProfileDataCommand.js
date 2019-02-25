class UpdateProfileDataCommand {
    constructor(){
        this.nick
        this.hourInFatec
        this.hourOutFatec
        this.telephone

        this.isDriver // boolean
        this.numberCNH
        this.typeCNH  // enum/car
        this.expirationDateCNH
    }
}

exports.UpdateProfileDataCommand = UpdateProfileDataCommand