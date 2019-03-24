import React from 'react'
import { ComboBox } from '../../Form/TextField'
import { connect } from 'react-redux'
import { setFlow } from '../../../actions/flowActions'

class WithTrajetos extends React.Component {
    
    fillFlows = () => {
        return this.props.flows.map(json => json.name)
    }
    
    getFlowByName = flowName => this.props.flows.filter(flow => flow.name === flowName)[0]
    
    saveInRedux = flowName => {
        const flow = this.getFlowByName(flowName)
        console.log(flow)
        this.props.dispatch(setFlow({ ...flow }))
    }

    render(){
        return (
            <ComboBox 
                options={this.fillFlows()} 
                label='Selecione...' 
                onChange={ e => this.saveInRedux(e.target.value) } 
            />
        )
    }
}

export default connect()(WithTrajetos)