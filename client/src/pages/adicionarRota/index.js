import React, { Component, Fragment } from 'react'
import GoogleMaps from '../../components/GoogleMaps'
import { OutlinedTextField } from '../../components/Form/TextField';
import CustomTable from '../../components/Table';
import Button from '../../components/Form/Button'
import { Typography } from '@material-ui/core';
import './style.css'

class AdicionarRota extends Component {
  constructor(props) {
	super(props)
	this.state = {
		txtOrigem : undefined,
		txtDestino: undefined,
		txtPontosInteresses: undefined,
		data: []
	}
    // this.state = {waypoints: [], route: {}}
  }

	fetchData = event => {
		const value = this.state.txtPontosInteresses.value
		this.state.data.push([value])
		this.setState({ data: this.state.data })
		
	}

	componentDidMount() {
		this.bindAutoComplete(this.state.txtOrigem)
		this.bindAutoComplete(this.state.txtDestino)
		this.bindAutoComplete(this.state.txtPontosInteresses)
	}

	bindAutoComplete(element) {
		new window.google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */(element))
	}

	handleClick = event => {
		// action click
		if (this.props.onSaveClick) this.props.onSaveClick(event)
	}

	render () {
		const { withButton = true } = this.props
		return (
			<main className='adicionar-rota'>
				<Typography align='center'>
					<OutlinedTextField label='Nome da Rota' block className='component' />
					<OutlinedTextField label='Origem' inputRef={el => this.state.txtOrigem = el} block className='component' />
					<OutlinedTextField label='Destino' inputRef={el => this.state.txtDestino = el} block className='component' />
					<div className='custom-component' >
						<OutlinedTextField label='Pontos de interesse' inputRef={el => this.state.txtPontosInteresses = el} />
						<Button onClick={this.fetchData}> Adicionar </Button>
					</div>
					<CustomTable data={this.state.data} header={['Pontos de Interesse']} className='component' />

					{ withButton ? <Button className='component' onClick={this.handleClick}> Salvar </Button> : null }
				</Typography>
			</main>
		)
	}
}

export default AdicionarRota
