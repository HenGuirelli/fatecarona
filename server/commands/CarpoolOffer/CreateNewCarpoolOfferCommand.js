class CreateNewCarpoolOfferCommand {
    constructor(){
        this.date
        this.hour
        this.car // model/car
        this.flow // model/flow
        this.destination  // enum/destination
        this.isSmokerAllowed // boolean
        this.isMusicAllowed  // boolean
        this.isWheelchairAccommodation // bolean
    }
}

exports.CreateNewCarpoolOfferCommand = CreateNewCarpoolOfferCommand