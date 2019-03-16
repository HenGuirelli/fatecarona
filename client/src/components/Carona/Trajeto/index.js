import React, { Fragment } from 'react'
import { ComboBox } from '../../Form/TextField'
import Button from '../../Form/Button'
import AdicionarRota from '../../../pages/adicionarRota'
import Section from '../Section'
import FlowHttp from '../../../http/Flow'
import { connect } from 'react-redux'

const flowsTest = [
	{
		name: "trajeto 1",
		origin: "origin",
		destination: "destination",
		waypoints: ["ponto 1", "ponto 2", "ponto 3"]
	},
	{
		name: "trajeto 2",
		origin: "origin",
		destination: "destination",
		waypoints: ["ponto 1", "ponto 2", "ponto 3"]
	},
	{
		name: "trajeto 3",
		origin: "origin",
		destination: "destination",
		waypoints: ["ponto 1", "ponto 2", "ponto 3"]
	}
]

const fillTrajetos = flows => {
    return flows.map(json => json.name)
}

const WithTrajetos = props => (
    <ComboBox options={fillTrajetos(props.flows)} label='Selecione...' />
)

class WithoutTrajetos extends React.Component {
    state = {
        rotaVisible: false
    }

    handleClick = event => {
        this.setState({ rotaVisible: true })
    }

    onSaveClick = () => {
        this.setState({ rotaVisible: false })
        if (this.props.onSaveClick){
            try {
                setTimeout(this.props.onSaveClick, 1000) 
            }catch (e) { /* não explode o app caso haja uma exceção */  }
        }
    }

    render(){
        return (
            <Fragment>
                <p>Você não tem um trajeto Salvo</p>
                <AdicionarRota style={{ display: this.state.rotaVisible ? 'block' : 'none' }} onSaveClick={ this.onSaveClick } />
                <Button style={{ display: this.state.rotaVisible ? 'none' : 'block' }} onClick={ this.handleClick }>Adicionar</Button>
            </Fragment>
        )
    }
}

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
            console.log('result', result)
            this.setState({ flows: result })
        })
    }

    render(){
        const { flows } = this.state
        return (
            <Section title='Trajeto:'>
                {
                    flows && flows.length != 0 ? 
                    <WithTrajetos flows={flows || flowsTest} /> :
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