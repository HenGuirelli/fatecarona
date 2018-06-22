import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import config from '../../config.json'
//import styles from './styles'
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
    })
    .then(() => {
      axios.put(config.endpoint + '/lift/id/' + infoNotification.idCarona, {
        status: 'andamento'
      })
      .then(() => {
        window.displayDialog({msg: "Notificação enviada."})
      })
    })
  }

  handleEspiar = (email) => {
    this.props.dispatch(espiarMembro(email));
    this.props.history.push('/perfil/espiar')
  }

  render() {
    const { infoNotification } = this.props

    const styles = {
      btn: {
        borderRadius: '8px',
        backgroundColor: '#6E4D8B',
        borderColor: '#ffffff',
        color: '#ffffff',
        fontSize: '12px',
        width:'12em'
      }
    }

    return(
      <div className="container" style={styles.root}>
        <div className="row" style={{marginTop:'2em'}}>
          <div className="col-3 col-xl-1" style={{textAlign:'right'}}>
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
          <div className="col-6" style={{textAlign: 'right'}}>
            <input type="button" style={styles.btn} className="btn btn-primary" value="ACEITAR"
              onClick={() => this.handleResponse(true)}
            />
          </div>
          <div className="col-6">
            <input type="button" style={styles.btn} className="btn btn-primary" value="RECUSAR"
              onClick={() => this.handleResponse(false)}
            />
          <div className="row" style={{bottom: 0, width: '100%'}}>
            <div className="col-12">
              <input type="button" style={styles.btn}  onClick ={() => this.handleEspiar(infoNotification.emailRemetente)} className="btn btn-primary" value="ESPIAR MOTORISTA" />
            </div>
          </div>
          </div>


        </div>
      </div>
    )
  }
}
