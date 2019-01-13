import React, { Component } from 'react'
import { connect } from 'react-redux'
import CarIcon  from '../../components/Veiculo/veiculo_preto.png'
import ViagIcon from '../../components/Veiculo/viagensfeitas.png'
import KmIcon from '../../components/Veiculo/kmviagens.png'
import { updateCar, deleteCar } from '../../actions/carActions'
import popUp, { TIPO } from '../../components/PopUp'

const styles = {
  btn:{
    fontSize: '12px',
    width: '100%',
    backgroundColor: '#6E4D8B',
    borderColor: '#6E4D8B'
  },
  btnDialog:{
    fontSize: '12px',
    width: '70px',
    margin: '0 10px',
    backgroundColor: '#6E4D8B',
    borderColor: '#6E4D8B'
  },
  btnContainer: {
    padding:  '0 10px',
    width: '100%'
  },
  marginStyle:{
    marginTop: '2em'
  },
  inputNumber:{
    width: '4em',
    height: '2em'
  },
  colFormat:{
    textAlign: 'right'
  },
  textFormat:{
    fontSize:'12px'
  }
}

class AtivarVeic extends Component{
  handleAtivar = (placa) => {
    let cont = 0
    this.props.veiculos.forEach(e => {
        if (e.ativo === 1)
          cont ++;
      }
    )
    if (cont === 2){
      popUp({tipo: TIPO.ERRO, text: 'Somente 2 carros podem estár ativos sumultaneamente!'})
      return;
    }else{
      this.props.dispatch(updateCar(placa, { ativo: 1 }))
      popUp({tipo: TIPO.SUCESSO, text: 'O veículo está ativo!'}, '/veiculos')
    }
  }

  handleDesativar = (placa) => {
    this.props.dispatch(updateCar(placa, { ativo: 0 }))
    popUp({tipo: TIPO.SUCESSO,text: 'O veículo foi desativado!'}, '/veiculos')
  }

  handleDelete = (placa) => {
    this.props.dispatch(deleteCar(placa))
    popUp({tipo: TIPO.SUCESSO, title: 'Aviso', text: 'O veículo com placa ' + placa + ' foi excluido!'}, '/veiculos')
  }

  showConfirmation = () => {
    popUp({
      tipo: TIPO.SIM_NAO,
      text: 'Tem certeza de que deseja excluir o veículo e todos os dados acumulados ?',
      sim: () => this.handleDelete(this.props.veiculo.placa)
    })
  }

  render(){

    const { veiculo } = this.props

    return(
      <div className="pageBase">
        <div className="container">
          <form className="form-group">
            <center>
            <div style={{marginTop: '7em'}}>
              <img src={CarIcon} alt={"Car Icon"} color="#000" style={{width: '4em', height: '1.7em'}}/>
            </div>
            <div>
              {veiculo.placa}
            </div>
            <div className="row" style={styles.marginStyle}>
              <div className="col-6" style={styles.colFormat}>
                MARCA:
              </div>
              <div className="col-0">
                {veiculo.marca}
              </div>
            </div>

            <div className="row">
              <div className="col-6" style={styles.colFormat}>
                MODELO:
              </div>
              <div className="col-0">
                {veiculo.modelo}
              </div>
            </div>

            <div className="row" style={styles.marginStyle}>
              <div className="col-6" style={{textAlign: 'right'}}>
                <img src={ViagIcon} alt={"ViagensIcon"} color="#6E4D8B" style={{width: '3em', height: '2.7em', marginRight: '1.1em'}}/>
                <div style={styles.textFormat}>Viagens já feitas</div>
                <div style={{paddingRight: '2em'}}>0</div>
              </div>
              <div className="col-0">
                <img src={KmIcon} alt={"KmIcon"} color="#6E4D8B" style={{width: '3em', height: '3em', margin:'0'}}/>
                <div style={styles.textFormat}>Km com viagens</div>
                <div>0</div>
              </div>
            </div>
            <div  className="row">
              <div className="" style={styles.btnContainer}>
                <input type="button" value="Excluir" className="btn btn-primary" style={styles.btn} onClick={this.showConfirmation}/>
              </div>
            </div>
          </center>
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
    veiculo: store.car.veiculo,
    veiculos: store.car.veiculos
  }
})(AtivarVeic)
