class CreateNewFlowcommand {
    constructor({ name, origin, destination, waypoints, email }){
        this.name = name
        this.origin = origin
        this.destination = destination
        this.waypoints = waypoints
        this.email = email
    }
}

exports.CreateNewFlowcommand = CreateNewFlowcommand