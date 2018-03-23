import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import config from '../../config.json'
import styles from './styles'

export default class AvatarHeader extends Component {
  render() {
    const { userData } = this.props

    return(
      <div style={styles.root}>
        <center>
          <div style={styles.nome}>{userData.nome}</div>
          <div style={styles.status}>Oferecendo Carona</div>
        </center>
        <div className="container">
          <div className="row" style={styles.background}>
            <div className="col-2" style={{position: 'relative'}}>
              <div style={styles.horaChegada}>
                <div>Chegando<br/>na<br/>Fatec</div>
                <h2>{userData.chegada ? userData.chegada.substr(0, 5) : ''}</h2>
              </div>
            </div>
            <center className="col-8">
              <Avatar
                src={userData.img ? config.endpoint + "/images/" + userData.img : ""}
                size={150}
                style={styles.avatar}
              />
            </center>
            <div className="col-2" style={{position: 'relative'}}>
              <div style={styles.horaSaida}>
                <div>Saindo<br/>da<br/>Fatec</div>
                <h2>{userData.saida ? userData.saida.substr(0, 5) : ''}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
