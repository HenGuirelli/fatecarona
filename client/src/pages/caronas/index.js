import React, { Component } from 'react'
import LiftRating from '../../components/LiftRating'
import LiftMgt from '../../components/LiftMgt'
import { connect } from 'react-redux'
import { loadCaronista, loadLiftbyID, loadLiftbyEmail, carregar } from '../../actions/liftActions'


class Caronas extends Component {

  liftbyEmail () {
    this.props.dispatch(loadLiftbyEmail(this.props.userData.email))
  }

  liftbyID() {
    this.props.dispatch(loadCaronista(this.props.userData.email))
    this.props.listaCaronista.map((caronista) =>
      this.props.dispatch(loadLiftbyID(caronista.id))
    )
  }

    handleActivation = (carona) =>{
      this.props.dispatch(carregar(carona));
      this.props.history.push('/caronas/gerenciar')
    }



  componentWillMount() {
    this.liftbyEmail();
    this.liftbyID();

  }

  render() {
    const {caronasbyEmail, caronasbyID} = this.props

    const styles = {
      btn: {
        margin: '25px 0',
        borderRadius: '8px',
        backgroundColor: '#6E4D8B',
        borderColor: '#ffffff',
        color: '#ffffff',
        fontSize: '12px',
        width: '80%',
        marginLeft: '8%'
      },
      btn2: {
        margin: '25px 0',
        borderRadius: '8px',
        backgroundColor: '#6E4D8B',
        borderColor: '#ffffff',
        color: '#ffffff',
        fontSize: '12px',
        width: '80%',

      },
    }

    return (
      <div>

        <div className="row btn-group btn-group-toggle" style={{width:'100%'}} data-toggle="buttons">
          <label className="btn btnLift col-4">
            <input type="radio" name="options" id="option1" autoComplete="off"/> EM ANDAMENTO
          </label>
          <label className="btn btnLift col-4">
            <input type="radio" name="options" id="option2" autoComplete="off"/> HISTÓRICO
          </label>
          <label className="btn btnLift col-4">
            <input type="radio" name="options" id="option3" autoComplete="off"/> PENDENTE
          </label>
        </div>

        <div className="container">
          <div className="row" >
              {
              caronasbyEmail.length > 0 ? caronasbyEmail.map((carona, key) =>
              <div className="row" key={key} style={{padding: '0em 0', margin: '0', borderBottom: '2px solid grey'}}>
                  <LiftMgt
                    infomotorista={carona.emailMotorista}
                    caronista = {0}
                    data={carona.dataCarona}
                    tipo={carona.tipo}
                  />
                <div className="row" style={{bottom: 0, width: '100%'}}>
                  <div className="col-6" style={styles.btnContainer}>
                    <input type="button" style={styles.btn} onClick={() => this.handleActivation(carona)} className="btn btn-primary" value="GERENCIAR" />
                  </div>
                  <div className="col-6" style={styles.btnContainer}>
                    <input type="button" style={styles.btn2} onClick ={this.handleSubmit} className="btn btn-primary" value="ESPIAR MOTORISTA" />
                  </div>
                </div>
              </div>
              )
              :
              <div>
              </div>
            }
            {
              caronasbyID.length > 0 ? caronasbyID.map((carona, key) =>
              <div className="row" key={key} style={{padding: '0em 0', margin: '0', borderBottom: '2px solid grey'}}>
                <button className="btn loginBtn" onClick={() => this.handleActivation(carona)} style={styles.carButton}>
                  <LiftMgt
                    infomotorista={carona.emailMotorista}
                    caronista = {1}
                    data={carona.dataCarona}
                    tipo={carona.tipo}
                  />
                </button>
              </div>
              )
              :
              <div>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    caronasbyID: store.lift.caronasbyID,
    caronasbyEmail: store.lift.caronasbyEmail,
    listaCaronista: store.lift.listaCaronista,
    user: store.user.user,
    userData: store.user.userData
  }
})(Caronas)
