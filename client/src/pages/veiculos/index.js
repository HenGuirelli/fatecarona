import React, { Component } from 'react'
import Veiculo from '../../components/Veiculo'
import { connect } from 'react-redux'
import { ativar, loadCar } from '../../actions/carActions'


class Veiculos extends Component{

  handleActivation = (car) =>{
    this.props.dispatch(ativar(car));
    this.props.history.push('/veiculos/ativar')
  }

  handleSubmit = () =>{
    this.props.history.push('/veiculos/cadastrar')
  }

  componentWillMount() {
    this.props.dispatch(loadCar(this.props.userData.email))
  }


  render(){
    const {veiculos} = this.props

    const styles = {
      button: {
        borderRadius: '25px',
        backgroundColor: '#6E4D8B',
        borderColor: '#a8cf45',
        color: '#a8cf45',
        fontSize: '25px',
        bottom: '3px'
      },

      carButton:{
        margin: '25px 0',
        borderRadius: '25px',
        backgroundColor: 'transparent',
        fontSize: '15px'
      }
    }

      return(
        <div className="pageBase">
          <div className="container">
            {
              veiculos.length > 0 ? veiculos.map((veiculo, key) =>
              <div className="row" key={key} style={{padding: '0em 0', margin: '0', borderBottom: '2px solid grey'}}>
                <button className="btn loginBtn" onClick={() => this.handleActivation(veiculo)} style={styles.carButton}>
                  <Veiculo
                    marca={veiculo.marca}
                    modelo={veiculo.modelo}
                    placa={veiculo.placa}
                    ativo={veiculo.ativo}
                  />
                </button>
              </div>
              )
              :
              <div>
                Não há veículo adicionado.
              </div>
            }
          </div>
          <input type="button" onClick={this.handleSubmit} value="ADICIONAR" className="btn loginBtn btn-block" style={styles.button}/>
        </div>
      )
    }
  }


export default connect(store => {
  return {
    veiculo: store.car.veiculo,
    veiculos: store.car.veiculos,
    userData: store.user.userData
  }
})(Veiculos)
