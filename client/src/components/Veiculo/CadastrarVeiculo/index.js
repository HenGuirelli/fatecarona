import React, { Component } from 'react'
import { FormattedInput, OutlinedTextField } from '../../Form/TextField'
import Button from '../../Form/Button'
import CarHttp from '../../../http/Car'

import './style.css'
import PopUp, { TIPO } from '../../PopUp/index.js'

import { connect } from 'react-redux'
import { addCar } from '../../../actions/carActions'

class CadVeiculos extends Component{
	constructor(props) {
		super(props)
		this.state = {
			plate: props.plate,
			brand: props.brand,
			model: props.model,
			color: props.color
		}
		this.trackState = {
			plate: props.plate,
			brand: props.brand,
			model: props.model,
			color: props.color
		}
	}

	handleChange = (name, value) => {
		this.trackState[name] = value
		if(this.props.trackState){
			this.props.trackState(this.trackState)
		}
		this.setState({ [name]: value })
	}

	componentDidMount(){
		//this.loadMarcas()
		if(this.props.trackState){
			this.props.trackState(this.trackState)
		}
	}

	handleClickAdicionar = event => {
		const { plate, brand, model, color } = this.state
		const { email } = this.props

		CarHttp.createNewCar({ plate, brand, model, color, email })
		.then(resolve => {
			const result = resolve.data

			if (result.success){
				PopUp({ tipo: TIPO.SUCESSO, text: 'Veiculo adicionado' })
				.then (value => {
					if (this.props.onClickAdicionarCallback){
						this.props.onClickAdicionarCallback(event)
					}
				})
			}else{
				PopUp({ tipo: TIPO.ERRO, text: result.message })
			}
		})
	}

	render(){
		const { withButton = true, ...restProps } = this.props
		return(
			<div className='cadastro-veiculo' {...restProps}>
				<div className='veiculos'>
					<OutlinedTextField 
						label='PLACA' 	
						className='component centralize'
						onChange={ (event) => this.handleChange('plate', event.target.value) }
						value={this.state.plate}
					/>
					<OutlinedTextField 
						label='Marca'
						className='component centralize'
						onChange={ (event) => this.handleChange('brand', event.target.value) }
						value={this.state.brand}
					/>
					<OutlinedTextField 
						label='Modelo' 
						className='component centralize'
						onChange={ (event) => this.handleChange('model', event.target.value) }
						value={this.state.model}
					/>
					<OutlinedTextField 
						label='Cor' 
						className='component centralize'
						onChange={ (event) => this.handleChange('color', event.target.value) }
						value={this.state.color}
					/>
					{ withButton ? <Button className='component centralize' onClick={this.handleClickAdicionar}> Adicionar </Button> : null }
				</div>
			</div>    
		)
	}
}

export default connect(store => {
	return {
		email: store.user.email,
		plate: store.car.plate,
		brand: store.car.brand,
		model: store.car.model,
		color: store.car.color,
	}
})(CadVeiculos)
