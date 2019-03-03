const { CreateNewFlowcommand } = require('../commands/Flow/CreateNewFlowCommand')
const { DeleteFlowCommand } = require('../commands/Flow/DeleteFlowCommand')
const { UpdateFlowCommand } = require('../commands/Flow/UpdateFlowCommand')
const { FlowHandler } = require('../commandHandlers/FlowHandler')

const TrajetoController = app => {
    app.get('/trajeto/:email', (req, res) => {
        res.send('get all trajetos')
    })

    // insert new flow
    app.post('/trajeto', (req, res) => {
        const command = new CreateNewFlowcommand({ ...req.body })
        res.send(FlowHandler.createNewFlow(command))
    })

    // update flow by id
    app.put('/trajeto/:id', (req, res) => {
        const { id } = req.params
        const command = new UpdateFlowCommand({ id: parseInt(id), ...req.body })
        res.send(FlowHandler.updateFlow(command))
    })

    // delete flow by id
    app.delete('/trajeto/:id', (req, res) => {
        const command = new DeleteFlowCommand({ id: parseInt(req.params.id) })
        res.send(FlowHandler.deleteFlow(command))
    })
}

exports.Trajeto = TrajetoController