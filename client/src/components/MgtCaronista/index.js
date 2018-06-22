import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import config from '../../config.json'
//import styles from './styles'
import axios from 'axios'

export default class MgtCaronista extends Component {

  handleResponse = (answer) => {
    const { infoNotification, userData } = this.props
    if (answer) {
      axios.put(config.endpoint + '/lift/members/' + infoNotification.idCarona, {
        status: 'aceito',
        emailCaronista: infoNotification.emailRemetente
      })
      .then(() => {
        axios.put(config.endpoint + '/lift/id/' + infoNotification.idCarona, {
          status: 'andamento'
        })
        .then(() => {
          axios.post(config.endpoint + '/notify/' + infoNotification.emailRemetente, {
            message: userData.nome + " aceitou sua solicitação.",
            emailRemetente: userData.email,
            imgRemetente: userData.img
          })
        })
        .then(() => {
          axios.put(config.endpoint + '/lift/id/' + infoNotification.idCarona, {
            status: 'andamento'
          })
          .then(() => {
            axios.put(config.endpoint + '/notifications/' + infoNotification._id, {read: true})
            .then(() => window.displayDialog({msg: "Notificação enviada."}))
          })
        })
      })
      return
    }
    axios.put(config.endpoint + '/notifications/' + infoNotification._id, {read: true})
    .then(() => window.displayDialog({msg: "Notificação enviada."}))
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
        {
          infoNotification.idCarona === null ?
          null :
          <div className="row" style={{bottom: 0, width: '100%'}}>
            <div className="col-6">
              <input type="button" style={styles.btnL} className="btn btn-primary" value="ACEITAR"
                onClick={() => this.handleResponse(true)}
              />
            </div>
            <div className="col-6">
              <input type="button" style={styles.btnR} className="btn btn-primary" value="RECUSAR"
                onClick={() => this.handleResponse(false)}
              />
            </div>
          </div>
        }
      </div>
    )
  }
}
