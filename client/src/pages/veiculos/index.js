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
    if (this.props.userData.cnh !== null)
      this.props.history.push('/veiculos/cadastrar')
    else {
      window.displayDialog({msg: "Para cadastrar um veículo é necessário cadastrar o número da CNH"}, '/perfil')
    }
  }

  componentWillMount() {
    this.props.dispatch(loadCar(this.props.userData.email))
  }


  render(){
    const {veiculos, needLoad, userData} = this.props

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

      carButton:{
        margin: '25px 0',
        borderRadius: '25px',
        backgroundColor: 'transparent',
        fontSize: '15px'
      }
    }

    if (userData.email && needLoad) this.props.dispatch(loadCar(userData.email))

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
          <input type="button" onClick={this.handleSubmit} value="Adicionar" className="btn loginBtn btn-block" style={styles.button}/>
        </div>
      )
    }
  }


export default connect(store => {
  return {
    veiculo: store.car.veiculo,
    veiculos: store.car.veiculos,
    userData: store.user.userData,
    needLoad: store.car.needLoad,
  }
})(Veiculos)
