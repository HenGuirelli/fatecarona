import React, { Component } from 'react'
import config from '../../../config.json'
import axios from 'axios'
import { FormattedInput, OutlinedTextField } from '../../Form/TextField'
import Button from '../../Form/Button'

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
      
    if (this.props.onClickAdicionarCallback)
        this.props.onClickAdicionarCallback(event)
  }

  render(){
    const { suggestionsMarca, suggestionsModelo } = this.state;
    const {  withButton = true, ...restProps } = this.props
    return(
		<div className='cadastro-veiculo' {...restProps}>
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
                { withButton ? <Button className='component centralize' onClick={this.handleClickAdicionar}> Adicionar </Button> : null }
			</div>
		</div>    
    )
  }
}

export default CadVeiculos
