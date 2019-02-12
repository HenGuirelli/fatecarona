import React, { Component } from 'react'
import { connect } from 'react-redux'
import { insertCar } from '../../actions/carActions'
import MaskedInput from 'react-maskedinput'
import config from '../../config.json'
import axios from 'axios'
import popUp, { TIPO } from '../../components/PopUp'
import Autosuggest from 'react-autosuggest';

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
    //if (this.state.marca !== '') this.loadModelo();

    const styles = {
      button: {
        margin: '25px 0',
        borderRadius: '8px',
        backgroundColor: '#6E4D8B',
        borderColor: '#ffffff',
        color: '#ffffff',
        fontSize: '20px',
        width: '70%',
        marginLeft: '15%'
      },
      inputText: {
        borderRadius: '10px',
        borderWidth: '1.5px',
        borderColor: '#6E4D8B',
        width: '8em',
        textAlign:'center'
      },
      inputOption: {
        width: '80%',
        borderRadius: '7px',
        borderWidth: '1px',
        borderColor: '#6E4D8B'
      },
      inputNumber: {
        width: '10em',
      },
      borderNumber:{
        borderRadius: '7px',
        borderWidth: '1px',
        borderColor: '#6E4D8B',
        textAlign: 'center',
        width: '5em'
      }
    }
    return(
      <div className="pageBase">
        <div className="container">
          <form className="form-group">
            <div style={{padding: '2em 0', margin: '0 1px', borderBottom: '2px solid grey'}}>
              <center>
                <div className="col-6">PLACA</div>
                <MaskedInput
                  style={styles.inputText}
                  mask='AAA-1111'
                  className="form-control"
                  value={this.state.placa}
                  onChange={this.handlePlaca}
                />
              </center>
            </div>
            <div style={{padding: '2em 0', margin: '0 1px', borderBottom: '2px solid grey'}}>
              <center>
                <div className="col-6">MARCA</div>
                <Autosuggest
                  suggestions={suggestionsMarca}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequestedMarca}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequestedMarca}
                  getSuggestionValue={getSuggestionValueMarca}
                  renderSuggestion={renderSuggestionMarca}
                  inputProps={{className:"form-control", style:styles.inputOption, value:this.state.marca || '', onChange:this.handleMarca}}
                />
              </center>
            </div>
            <div style={{padding: '2em 0', margin: '0 1px', borderBottom: '2px solid grey'}}>
              <center>
                <div className="col-6">MODELO</div>
                  <Autosuggest
                    suggestions={suggestionsModelo}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequestedModelo}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequestedModelo}
                    getSuggestionValue={getSuggestionValueModelo}
                    renderSuggestion={renderSuggestionModelo}
                    inputProps={{className:"form-control", style:styles.inputOption, value:this.state.modelo || '', onChange:this.handleModelo}}
                  />
                </center>
            </div>
            <div style={{padding: '2em 0', margin: '0 1px', borderBottom: '2px solid grey'}}>
              <center>
                <div className="col-6">COR</div>
                  <input className="form-control" style={styles.inputOption} value={this.state.cor || ''} onChange={this.handleCor} />
              </center>
            </div>
            <input type="button" value="Adicionar" onClick={this.handleSubmit} className="btn loginBtn form-control" style={styles.button}/>
          </form>
        </div>
      </div>
    )
  }
}

export default CadVeiculos
