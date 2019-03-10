import React, { Component } from 'react'
import config from '../../../config.json'
import axios from 'axios'
import { FormattedInput, OutlinedTextField } from '../../Form/TextField'
import Button from '../../Form/Button'
import CarHttp from '../../../http/Car'

import './style.css'
import PopUp, { TIPO } from '../../PopUp/index.js';

import { connect } from 'react-redux'

const mask = 'AAA-1111'

let marcas = [
  { id: 0, marca: 'carregando...' }
];

let modelos = [
  { id: 0, modelo: 'carregando...' }
]

// Marca
function escapeRegexCharactersMarca(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionsMarca(value) {
  const escapedValue = escapeRegexCharactersMarca(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return marcas.filter(language => regex.test(language.marca));
}

function getSuggestionValueMarca(suggestion) {
  return suggestion.marca;
}

function renderSuggestionMarca(suggestion) {
  return (
    <span>{suggestion.marca}</span>
  );
}

function getIdByNameMarca(name){
  try {
    return marcas.filter(marca => marca.marca === name)[0].id
  } catch(err){
    return 0
  }
}

// Modelo
function escapeRegexCharactersModelo(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionsModelo(value) {
  const escapedValue = escapeRegexCharactersModelo(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return modelos.filter(language => regex.test(language.modelo));
}

function getSuggestionValueModelo(suggestion) {
  return suggestion.modelo;
}

function renderSuggestionModelo(suggestion) {
  return (
    <span>{suggestion.modelo}</span>
  );
}

class CadVeiculos extends Component{
	constructor(props) {
		super(props);
		this.state = {
			plate: '',
			brand: '',
			model: '',
			color: '',
			suggestionsMarca: [],
			suggestionsModelo: []
		};
		this.trackState = {}
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
	}

	// Marca
	onSuggestionsFetchRequestedMarca = ({ value }) => {
		this.setState({
			suggestionsMarca: getSuggestionsMarca(value)
		});
	};

	onSuggestionsClearRequestedMarca = () => {
		this.setState({
			suggestionsMarca: []
		});
	};

	//Modelo
	onSuggestionsFetchRequestedModelo = ({ value }) => {
		this.setState({
			suggestionsModelo: getSuggestionsModelo(value)
		});
	};

	onSuggestionsClearRequestedModelo = () => {
		this.setState({
			suggestionsModelo: []
		});
	};

	handleClickAdicionar = event => {
		const { plate, brand, model, color } = this.state
		const { email } = this.props

		CarHttp.createNewCar({ plate, brand, model, color, email })
		.then(resolve => {
			const result = resolve.data

			if (result.success){
				PopUp({ tipo: TIPO.SUCESSO, text: 'Veiculo adicionado' })
			}else{
				PopUp({ tipo: TIPO.ERRO, text: result.message })
			}
		})

		if (this.props.onClickAdicionarCallback){
			this.props.onClickAdicionarCallback(event)
		}
	}

	render(){
		const { suggestionsMarca, suggestionsModelo } = this.state;
		const { withButton = true, ...restProps } = this.props
		return(
			<div className='cadastro-veiculo' {...restProps}>
				<div className='veiculos'>
					<FormattedInput 
						label='PLACA' 
						mask={[/[A-Z]/, /[A-Z]/, /[A-Z]/, '-', /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/ ]}
						variant='outlined'			
						className='component centralize'
						onChange={ (event) => this.handleChange('plate', event.target.value) }
					/>
					<OutlinedTextField label='Marca'
						className='component centralize'
						onChange={ (event) => this.handleChange('brand', event.target.value) }
					/>
					<OutlinedTextField label='Modelo' 
						className='component centralize'
						onChange={ (event) => this.handleChange('model', event.target.value) }
					/>
					<OutlinedTextField label='Cor' 
						className='component centralize'
						onChange={ (event) => this.handleChange('color', event.target.value) }
					/>
					{ withButton ? <Button className='component centralize' onClick={this.handleClickAdicionar}> Adicionar </Button> : null }
				</div>
			</div>    
		)
	}
}

export default connect(store => {
	return {
		email: store.user.email
	}
})(CadVeiculos)
