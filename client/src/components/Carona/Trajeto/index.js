import React, { Fragment } from 'react'
import { ComboBox } from '../../Form/TextField'
import Button from '../../Form/Button'
import AdicionarRota from '../../../pages/adicionarRota'
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
        return (
            <Fragment>
                <p>Você não tem um trajeto Salvo</p>
                <AdicionarRota style={{ display: this.state.rotaVisible ? 'block' : 'none' }} onSaveClick={() => this.setState({ rotaVisible: false })} />
                <Button style={{ display: this.state.rotaVisible ? 'none' : 'block' }} onClick={ this.handleClick }>Adicionar</Button>
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