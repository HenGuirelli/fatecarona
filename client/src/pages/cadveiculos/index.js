import React, { Component } from 'react'
import { connect } from 'react-redux'
import { insertCar } from '../../actions/carActions'
import MaskedInput from 'react-maskedinput'
import config from '../../config.json'
import axios from 'axios'
import popUp, { TIPO } from '../../components/PopUp'
import Autosuggest from 'react-autosuggest';

import './style.css'

let marcas = [
  { marca: 'carregando...' }
];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return marcas.filter(language => regex.test(language.marca));
}

function getSuggestionValue(suggestion) {
  return suggestion.marca;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.marca}</span>
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
      modelos: [],
      suggestions: []
    };
  }


  handlePlaca = (event) =>{
    if (event.target.value.length > 8) return
    this.setState({placa: event.target.value.toUpperCase()})
  }
  handleMarca = (event, {newValue}) =>{
    this.setState({marca: newValue})
  }
  handleModelo = (event) => {
    this.setState({modelo: event.target.value})
  }
  handleCor = (event) => {
    this.setState({cor: event.target.value})
  }

  loadMarcas = () => {
    axios.get(config.endpoint + "/cars/marcas/*")
    .then(result => {
      marcas = result.data
      console.log(result)
    })
  }

  loadModelo = () => {
    axios.get(config.endpoint + "/cars/marcas/" + this.state.marca)
    .then(result =>{
      try{
        axios.get(config.endpoint + "/cars/modelos/" + result.data[0].id)
        .then(resultModelos =>{
          this.setState({
            modelos: resultModelos.data
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

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render(){
    const { suggestions } = this.state;
    if (this.state.marca !== '') this.loadModelo();

    var modelos = this.state.modelos;

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
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={{className:"form-control", style:styles.inputOption, value:this.state.marca || '', onChange:this.handleMarca}}
                />                
              </center>
            </div>
            <div style={{padding: '2em 0', margin: '0 1px', borderBottom: '2px solid grey'}}>
              <center>
                <div className="col-6">MODELO</div>
                  <select className="form-control" style={styles.inputOption}  value={this.state.modelo || 'default'} onChange={this.handleModelo}>
                    <option value="default">Selecione...</option>
                    {modelos ? modelos.map((modelo, key) =>
                      <option value={modelo.modelo} key={key}>{modelo.modelo}</option>
                    ) : null}
                  </select>
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

export default connect(store => {
  return {
    user: store.user.user,
    userData: store.user.userData,
    veiculos: store.car.veiculos,
  }
})(CadVeiculos)
