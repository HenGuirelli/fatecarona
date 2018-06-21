import React, { Component } from 'react'
import { connect } from 'react-redux'
import { insertCar } from '../../actions/carActions'
import config from '../../config.json'
import axios from 'axios'


class CadVeiculos extends Component{
  constructor(props) {
    super(props);
    this.state = {
      placa: '',
      marca: '',
      modelo: '',
      cor: '',
      modelos: [],
    };
  }


  handlePlaca = (event) =>{
    this.setState({placa: event.target.value.toUpperCase()})
  }
  handleMarca = (event) =>{
    this.setState({marca: event.target.value})
  }
  handleModelo = (event) => {
    this.setState({modelo: event.target.value})
  }
  handleCor = (event) => {
    this.setState({cor: event.target.value})
  }


  loadModelo = () => {
    axios.get(config.endpoint + "/cars/marcas/" + this.state.marca)
    .then(result =>{
      axios.get(config.endpoint + "/cars/modelos/" + result.data[0].id)
      .then(resultModelos =>{
        this.setState({
          modelos: resultModelos.data
        })
      })
    })

  }

  handleSubmit = () => {
    if (this.props.veiculos.length === 5){
      window.displayDialog({msg: "Você já chegou ao limite máximo de veículos!"})
      return;
    }
    this.props.dispatch(insertCar({
        email: this.props.userData.email ,
        placa: this.state.placa,
        marca: this.state.marca,
        modelo: this.state.modelo,
        cor: this.state.cor
      }))
      window.displayDialog({msg: "Veículo adicionado!"}, '/veiculos')
  }

  render(){

    if (this.state.marca !== '') this.loadModelo();

    var modelos = this.state.modelos;

    const styles = {
      button: {
        margin: '25px 0',
        borderRadius: '15px',
        backgroundColor: '#6E4D8B',
        borderColor: '#a8cf45',
        color: '#a8cf45',
        fontSize: '25px',
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
                <input
                  placeholder='AAA-0000'
                  style={styles.inputText}
                  className="form-control"
                  value={this.state.placa}
                  onChange={this.handlePlaca}
                />
              </center>
            </div>
            <div style={{padding: '2em 0', margin: '0 1px', borderBottom: '2px solid grey'}}>
              <center>
                <div className="col-6">MARCA</div>
                <select className="form-control" style={styles.inputOption} value={this.state.marca || 'default'} onChange={this.handleMarca}>
                  <option value="default">Selecione...</option>
                  <option value="Chevrolet">Chevrolet</option>
                  <option value="Fiat">Fiat</option>
                  <option value="Ford">Ford</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Volkswagen">Volkswagen</option>
                </select>
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
                  <select className="form-control" style={styles.inputOption} value={this.state.cor || 'default'} onChange={this.handleCor}>
                    <option value="default">Selecione...</option>
                    <option value="BRANCO">BRANCO</option>
                    <option value="PRETO">PRETO</option>
                    <option value="VERMELHO">VERMELHO</option>
                  </select>
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
