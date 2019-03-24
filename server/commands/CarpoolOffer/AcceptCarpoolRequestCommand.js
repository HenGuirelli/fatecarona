class AcceptCarpoolRequestCommand {
    constructor({ driverEmail, riderEmail, carpoolId }){
        this.driverEmail = driverEmail
        this.riderEmail = riderEmail
        this.carpoolId = carpoolId
    }
}

exports.AcceptCarpoolRequestCommand = AcceptCarpoolRequestCommand