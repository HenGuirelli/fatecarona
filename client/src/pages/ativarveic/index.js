import React, { Component } from 'react'
import { connect } from 'react-redux'
import CarIcon  from '../../components/Veiculo/veiculo.png'
import ViagIcon from '../../components/Veiculo/viagensfeitas.png'
import KmIcon from '../../components/Veiculo/kmviagens.png'


class AtivarVeic extends Component{
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
                <input type="submit" value="ATIVAR" className="btn btn-primary" style={styles.btn}/>
              </div>
              <div className="col-6" style={styles.btnContainer}>
                <input type="submit" value="EXCLUIR" className="btn btn-primary" style={styles.btn}/>
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
    veiculo: store.car.veiculo
  }
})(AtivarVeic)
