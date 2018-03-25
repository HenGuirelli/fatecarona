import React, { Component } from 'react'
import { connect } from 'react-redux'
import { insertCar } from '../../actions/carActions'

class CadVeiculos extends Component{
  constructor(props) {
    super(props);
    this.state = {
      placa: '',
      marca: '',
      modelo: '',
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

  handleSubmit = () => {
    this.props.dispatch(insertCar({
        email: this.props.userData.email ,
        placa: this.state.placa,
        marca: this.state.marca,
        modelo: this.state.modelo
      }))
  }

  render(){
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
                <select className="form-control" style={styles.inputOption} defaultValue="default" onChange={this.handleMarca} value={this.state.marca}>
                  <option value="default">Selecione...</option>
                  <option>FIAT</option>
                  <option>MERCEDES</option>
                </select>
              </center>
            </div>
            <div style={{padding: '2em 0', margin: '0 1px', borderBottom: '2px solid grey'}}>
              <center>
                <div className="col-6">MODELO</div>
                  <select className="form-control" style={styles.inputOption} defaultValue="default" value={this.state.modelo} onChange={this.handleModelo}>
                    <option value="default">Selecione...</option>
                    <option>SIENA</option>
                    <option>PALIO</option>
                  </select>
                </center>
            </div>
            <input type="button" value="ADICIONAR" onClick={this.handleSubmit} className="btn loginBtn form-control" style={styles.button}/>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    user: store.user.user,
    userData: store.user.userData
  }
})(CadVeiculos)
