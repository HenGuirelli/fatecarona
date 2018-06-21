import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import config from '../../config.json'
import styles from './styles'
import axios from 'axios'
import { espiarMembro } from '../../actions/liftActions'

export default class MgtCaronista extends Component {

  handleResponse = (answer) => {
    const { infoNotification, userData } = this.props
    let status = answer ? 'aceito' : 'rejeitado'
    axios.put(config.endpoint + '/lift/members/' + infoNotification.idCarona, {
      status,
      emailCaronista: infoNotification.emailRemetente
    })
    .then(() => {
      axios.post(config.endpoint + '/notify/' + infoNotification.emailRemetente, {
        message: userData.nome + (answer ? " aceitou" : " rejeitou") + " sua solicitação.",
        emailRemetente: userData.email,
        imgRemetente: userData.img
      })
<<<<<<< HEAD
    })
    .then(() => {
      axios.put(config.endpoint + '/lift/id/' + infoNotification.idCarona, {
        status: 'andamento'
      })
      .then(() => {
        window.displayDialog({msg: "Notificação enviada."})
=======
      .then(() => {
        axios.put(config.endpoint + '/notifications/' + infoNotification._id, {read: true})
        .then(() => window.displayDialog({msg: "Notificação enviada."}))
>>>>>>> f5748065bd03a01e4b3e39f3b4e8482b01b42f71
      })
    })
  }

  handleEspiar = (email) => {
    this.props.dispatch(espiarMembro(email));
    this.props.history.push('/perfil/espiar')
  }

  render() {
    const { infoNotification } = this.props

    return(
      <div className="container" style={styles.root}>
        <div className="row">
          <div className="col-3 col-xl-1">
            <Avatar
              src={infoNotification.imgRemetente ? config.endpoint + "/images/" + infoNotification.imgRemetente : ""}
              size={50}
            />
          </div>
          <div className="col-9 col-xl-11">
            <div style={styles.descSize}>
              <span>{infoNotification.message}</span>
            </div>
          </div>
        </div>
        <div className="row" style={{bottom: 0, width: '100%'}}>
          <div className="col-4">
            <input type="button" style={styles.btnL} className="btn btn-primary" value="ACEITAR"
              onClick={() => this.handleResponse(true)}
            />
          </div>
          <div className="col-4">
            <input type="button" style={styles.btnR} className="btn btn-primary" value="RECUSAR"
              onClick={() => this.handleResponse(false)}
            />
          </div>
          <div className="col-4">
            <input type="button" style={styles.btnR}  onClick ={() => this.handleEspiar(infoNotification.emailRemetente)} className="btn btn-primary" value="ESPIAR MOTORISTA" />
          </div>


        </div>
      </div>
    )
  }
}
