class CreateNewCarCommand {
    constructor({ plate, brand, model, color, email }){
        this.plate = plate
        this.brand = brand
        this.model = model
        this.color = color
        this.email = email
    }
}

exports.CreateNewCarCommand = CreateNewCarCommand