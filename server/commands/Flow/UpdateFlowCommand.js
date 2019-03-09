class UpdateFlowCommand {
    constructor({ id, name, origin, destination, waypoints, email }){
        this.name = name
        this.origin = origin
        this.destination = destination
        this.waypoints = waypoints
        this.email = email
        this.id = id
    }
}

exports.UpdateFlowCommand = UpdateFlowCommand