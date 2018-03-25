import React, { Component } from 'react'
import { connect } from 'react-redux'
import CarIcon  from '../../components/Veiculo/veiculo.png'
import ViagIcon from '../../components/Veiculo/viagensfeitas.png'
import KmIcon from '../../components/Veiculo/kmviagens.png'
import { updateCar } from '../../actions/carActions'
import Dialog from 'material-ui/Dialog'




class AtivarVeic extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ativo: 0
    };
  }



  handleAtivar = (placa) => {
    let cont = 0
    this.props.veiculos.forEach(e => {
        if (e.ativo === 1)
          cont ++;
      }
    )
    if (cont === 2){
      this.displayDialog('Somente 2 carros podem estár ativos sumultaneamente!')
      return;
    }else{
      this.props.dispatch(updateCar(placa, {
        ativo: 1
      }))
      this.displayDialog('O veículo está ativo!')
    }
  }

  handleDesativar = (placa) => {
    this.props.dispatch(updateCar(placa, {
      ativo: 0
    }))
    this.displayDialog('O veículo foi desativado!')
  }

  displayDialog(msg) {
    this.setState({dialog: true, msg})
  }

  handleClose = () => {
    this.setState({dialog: false})
    this.props.history.push('/veiculos')
  }

  render(){

    const { veiculo } = this.props

    const styles = {
      btn:{
        fontSize: '12px',
        width: '100%',
        backgroundColor: '#6E4D8B',
        borderColor: '#6E4D8B'
      },
      btnContainer: {
        padding:  '0 10px',
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

    return(
      <div className="pageBase">
        <Dialog
          actions={null}
          modal={false}
          open={this.state.dialog}
          onRequestClose={this.handleClose}
        >
        {this.state.msg}
        </Dialog>
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
              <div className="col-6" style={styles.btnContainer}>
                {veiculo.ativo === 1 ?
                  <input type="button" onClick={() => this.handleDesativar(veiculo.placa)}  value="DESATIVAR" className="btn btn-primary" style={styles.btn}/>
                  :
                  <input type="button" onClick={() => this.handleAtivar(veiculo.placa)} value="ATIVAR" className="btn btn-primary" style={styles.btn}/>
                }
              </div>
              <div className="col-6" style={styles.btnContainer}>
                <input type="button" value="EXCLUIR" className="btn btn-primary" style={styles.btn}/>
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
