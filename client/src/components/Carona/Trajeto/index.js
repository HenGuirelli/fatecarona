import React from 'react'
import Section from '../Section'
import FlowHttp from '../../../http/Flow'
import { connect } from 'react-redux'
import WithTrajetos from './WithTrajetos'
import WithoutTrajetos from './WithoutTrajetos'

class Trajeto extends React.Component {
    state = {
        flows: []
    }

    componentDidMount(){
        this.searchFlows()
    }

    searchFlows = async () => {
        FlowHttp.getFlows({ email: this.props.email })
        .then(resolve => {
            const result = resolve.data
            this.setState({ flows: result })
        })
    }

    render(){
        const { flows } = this.state
        return (
            <Section title='Trajeto:'>
                {
                    flows && flows.length != 0 ? 
                    <WithTrajetos flows={flows} /> :
                    <WithoutTrajetos onSaveClick={ this.searchFlows } />
                }                
            </Section>
        )
    }
}

export default connect(store => {
    return {
        email: store.user.email
    }
})(Trajeto)