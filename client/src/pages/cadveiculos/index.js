import React, { Component } from 'react'
import { connect } from 'react-redux'
import { insertCar } from '../../actions/carActions'
import MaskedInput from 'react-maskedinput'
import config from '../../config.json'
import axios from 'axios'
import popUp, { TIPO } from '../../components/PopUp'
import Autosuggest from 'react-autosuggest';
import { FormattedInput, OutlinedTextField } from '../../components/Form/TextField'
import Button from '../../components/Form/Button'

import './style.css'

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
      placa: '',
      marca: '',
      modelo: '',
      cor: '',
      suggestionsMarca: [],
      suggestionsModelo: []
    };
  }


  handlePlaca = (event) =>{
    if (event.target.value.length > 8) return
    this.setState({placa: event.target.value.toUpperCase()})
  }
  handleMarca = (event, {newValue}) =>{
    this.setState({marca: newValue})
    this.loadModelo(getIdByNameMarca(newValue));
  }
  handleModelo = (event, {newValue}) => {
    this.setState({modelo:  newValue})
  }
  handleCor = (event) => {
    this.setState({cor: event.target.value})
  }

  loadMarcas = async () => {
    axios.get(config.endpoint + "/cars/marcas/*")
    .then(result => {
      marcas = result.data
    })
  }

  loadModelo = (idMarca) => {
    axios.get(config.endpoint + "/cars/marcas/" + this.state.marca)
    .then(result =>{
      try{
        axios.get(config.endpoint + "/cars/modelos/" + idMarca)
        .then(result =>{
          modelos = result.data
          this.setState({
            modelos: result.data
          })
        })
      }catch(err){
        this.setState({
          modelos: []
        })
      }
    })

  }

  componentDidMount(){
    this.loadMarcas()
  }

  handleSubmit = () => {
    if (this.props.veiculos.length === 5){
      popUp({tipo: TIPO.ERRO, text: "Você já chegou ao limite máximo de veículos!"})
      return;
    }
    this.props.dispatch(insertCar({
        email: this.props.userData.email ,
        placa: this.state.placa,
        marca: this.state.marca,
        modelo: this.state.modelo,
        cor: this.state.cor
      }))
      popUp({tipo: TIPO.SUCESSO, text: "Veículo adicionado!"}, '/veiculos')
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

  render(){
    const { suggestionsMarca, suggestionsModelo } = this.state;
    const {  withButton = true } = this.props
    console.log(withButton)
    return(
		<div className='cadastro-veiculo'>
			<div className='veiculos'>
				<FormattedInput 
					label='PLACA' 
					mask={[/[A-Z]/, /[A-Z]/, /[A-Z]/, '-', /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/ ]}
					variant='outlined'			
					className='component centralize'
				/>
				<OutlinedTextField label='Marca'
					className='component centralize'
				/>
				<OutlinedTextField label='Modelo' 
					className='component centralize'
				/>
				<OutlinedTextField label='Cor' 
					className='component centralize'
				/>
        { withButton ? <Button className='component centralize'> Adicionar </Button> : null }
			</div>
		</div>    
    )
  }
}

export default CadVeiculos
