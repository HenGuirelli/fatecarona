import React, { Fragment } from 'react'
import { ComboBox } from '../../Form/TextField'
import Button from '../../Form/Button'
import AdicionarRota from '../../../pages/adicionarRota'
import ComponentPopUpWrapper from '../../ComponentPopUpWrapper'
import Section from '../Section'

const trajetosTeste = [
	{
		nome: "trajeto 1",
		origem: "origem",
		destino: "destino",
		pontosDeInteresse: ["ponto 1", "ponto 2", "ponto 3"]
	},
	{
		nome: "trajeto 2",
		origem: "origem",
		destino: "destino",
		pontosDeInteresse: ["ponto 1", "ponto 2", "ponto 3"]
	},
	{
		nome: "trajeto 3",
		origem: "origem",
		destino: "destino",
		pontosDeInteresse: ["ponto 1", "ponto 2", "ponto 3"]
	}
]

const fillTrajetos = trajetos => {
    return trajetos.map(json => json.nome)
}

const WithTrajetos = props => (
    <ComboBox options={fillTrajetos(props.trajetos)} label='Selecione...' />
)

class WithoutTrajetos extends React.Component {
    state = {
        rotaVisible: false
    }

    handleClick = event => {
        this.setState({ rotaVisible: true })
    }

    closePopUp = event => {
        this.setState({ rotaVisible: false })
    }

    render(){
        console.log(this.state.rotaVisible)
        return (
            <Fragment>
                <ComponentPopUpWrapper open={this.state.rotaVisible} onBackgroundClick={this.closePopUp}> 
                    <AdicionarRota onSaveClick={() => this.setState({ rotaVisible: false })} />  
                </ComponentPopUpWrapper>
                <p>Você não tem um trajeto Salvo</p>
                <Button onClick={ this.handleClick }>Adicionar</Button>
            </Fragment>
        )
    }
}

class Trajeto extends React.Component {
    render(){
        const { trajetos } = this.props
        return (
            <Section title='Trajeto:'>
                {
                    trajetos && trajetos.lenght != 0 ? 
                    <WithTrajetos trajetos={trajetos || trajetosTeste} /> :
                    <WithoutTrajetos />
                }                
            </Section>
        )
    }
}

export default Trajeto