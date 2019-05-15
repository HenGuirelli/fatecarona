const { InsertFlow, DeleteFlow, DeleteWaypoints, UpdateFlow, UpdateWaypoints, InsertWaypoints } = require('../DAO/mysql')
const { EmailExists, GetFlowNumRows, WayPointExists } = require('../DAO/mysql')
const { Sync, Operation, action, actionDestination } = require('../services/sync')

const sync = Sync.getInstance()

class FlowHandler {
    static createNewFlow(createNewFlowCommand) {
        const id = GetFlowNumRows() + 3 // só para não ficar sequencial
        const val = {
            nome: createNewFlowCommand.name,
            origem: createNewFlowCommand.origin,
            destino: createNewFlowCommand.destination,
            email: createNewFlowCommand.email,
            id,
            pontos_interesse: createNewFlowCommand.waypoints,
        }
        
        if (!EmailExists(val.email)){
            return { success: false, message: `Email ${val.email} inválido` }
        }
        
        InsertFlow(val)
        sync.add(new Operation({ action: action.INSERT, values: { ...createNewFlowCommand, id }}), actionDestination.FLOW)
        return { success: true }
    }

    static deleteFlow(deleteFlowCommand){
        DeleteWaypoints(deleteFlowCommand.id)
        DeleteFlow(deleteFlowCommand.id)
        sync.add(new Operation({ action: action.DELETE, values: { ...deleteFlowCommand }}), actionDestination.FLOW)
        return { success: true }
    }

    static updateFlow(updateFlowCommand){
        const waypoints = updateFlowCommand.waypoints        

        const flow = {
            nome: updateFlowCommand.name,
            origem: updateFlowCommand.origin,
            destino: updateFlowCommand.destination
        }

        if(WayPointExists(updateFlowCommand.id)){
            UpdateWaypoints(waypoints, updateFlowCommand.id)
        }else{
            if (updateFlowCommand.waypoints.length > 0){
                InsertWaypoints(updateFlowCommand.waypoints, updateFlowCommand.id)
            }
        }
        UpdateFlow(flow, updateFlowCommand.id)
        sync.add(new Operation({ action: action.UPDATE, where: { id: updateFlowCommand.id }, values: { ...updateFlowCommand }}), actionDestination.FLOW)
        return { success: true }

    }
}

exports.FlowHandler = FlowHandler