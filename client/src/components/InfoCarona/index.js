import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { connect } from 'react-redux'
import styles from './styles'
import config from '../../config.json'
import { espiarMembro } from '../../actions/liftActions'
import axios from 'axios'

class InfoCarona extends Component {

  handleEspiar = (carona) => {
    this.props.dispatch(espiarMembro(carona.emailMotorista));
    this.props.history.push('/perfil/espiar')
  }

  requestLift = () => {
    window.displayDialog({
      title: "Eu quero",
      msg: "Deseja pegar essa carona?",
      actions: [
        <input
          type="button"
          value="Sim"
          className="btn btn-primary"
          style={styles.btnDialog}
          onClick={this.handleRequest}
        />,
        <input
          type="button"
          value="Não"
          className="btn btn-primary"
          style={styles.btnDialog}
          onClick={window.closeDialog}
        />
      ]
    })
  }

  handleRequest = () => {
    const { carona, userData } = this.props
    axios.post(config.endpoint + '/lift/members', {
      id: carona.id,
      emailCaronista: userData.email,
      status: 'pendente'
    })
    .then(() => {
      axios.post(config.endpoint + '/notify/' + carona.emailMotorista, {
        message: userData.apelido + ' solicitou vaga na carona de ' + new Date(carona.dataCarona).toLocaleDateString('pt-BR'),
        emailRemetente: userData.email,
        imgRemetente: userData.img,
        idCarona: carona.id
      })
      .then(() => {
        window.displayDialog({
          title: 'Eu quero',
          msg: 'Solicitação enviada, aguarde a resposta do motorista.'
        })
      })
    })
    .catch(() => {
      window.displayDialog({
        msg: 'Erro ao solicitar carona.'
      })
    })
  }

  render() {
    const { carona } = this.props
    let dataLift = new Date(carona.dataCarona)
    let dataCarona = (("0" + dataLift.getDate()).slice(-2) + "/" + ("0" + (dataLift.getMonth() + 1)).slice(-2) +
        "/" + dataLift.getFullYear())
    let horaCarona = dataLift.toTimeString().substr(0, 8)
    return(
      <div className="row" style={styles.root}>
        <div className="row" onClick={() => {window.displayDialog({msg: "Test"})}}>
          <div className="col-3 col-xl-1">
            <Avatar
              src={carona.motorista.img ? config.endpoint + "/images/" + carona.motorista.img : ""}
              size={50}
            />
          </div>
          <div className="col-9 col-xl-11">
            <div>
              <span>{carona.motorista.apelido + " "}</span>oferecendo carona com
              <span>{" " + carona.veiculo.marca + " " + carona.veiculo.modelo + " "}</span>
              em {dataCarona} {carona.tipo} horário de encontro {horaCarona}
            </div>
          </div>
        </div>
        <div className="row" style={{bottom: 0, width: '100%'}}>
          <div className="col-6">
            <input type="button" style={styles.btnL} className="btn btn-primary" value="EU QUERO"
              onClick={this.requestLift}
            />
          </div>
          <div className="col-6">
            <input type="button" style={styles.btnR} onClick ={() => this.handleEspiar(carona)} className="btn btn-primary" value="ESPIAR MOTORISTA" />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    userData: store.user.userData
  }
})(InfoCarona)
