import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import config from '../../config.json'
import styles from './styles'
import axios from 'axios'

export default class MgtCaronista extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dadosCaronista: undefined
    }
  }

  handleResponse = (answer) => {
    const { infoNotification, userData } = this.props
    let status = answer ? 'aceito' : 'rejeitado'
    axios.put(config.endpoint + '/lift/members/' + infoNotification.idCarona, {
      status,
      emailCaronista: infoNotification.emailRemetente
    })
    .then(() => {
      axios.post(config.endpoint + '/notify/' + infoNotification.emailRemetente, {
        message: userData.nome + (answer ? " aceitou" : " rejeitou") + " sua solicitação."
      })
      .then(() => {
        window.displayDialog({msg: "Notificação enviada."})
      })
    })
  }

  getUserData = (email) => {
    axios.get(config.endpoint + '/users/' + email)
    .then(result => {
      this.setState({dadosCaronista: result.data})
    })
  }

  componentWillMount() {
    this.getUserData(this.props.infoNotification.emailRemetente)
  }

  render() {
    const { infoNotification } = this.props
    const { dadosCaronista } = this.state

    return(
      <div className="container" style={styles.root}>
        <div className="row">
          <div className="col-3 col-xl-1">
            <Avatar
              src={dadosCaronista ? config.endpoint + "/images/" + dadosCaronista.img : ""}
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
      </div>
    )
  }
}