import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'

export default class AvatarHeader extends Component {
  render() {
    const { userData } = this.props

    const styles = {
      nome: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '20px',
      },
      avatar: {
        border: '3px solid white',
        marginTop: '11px',
      },
      status: {
        color: '#A8CF45',
      },
      background: { 
        height: '150px',
      },
      horaChegada: {
        color: 'white',
        textAlign: 'left',
        position: 'absolute',
        bottom: 0,
        left: '.5em',
      },
      horaSaida: {
        color: 'white',
        textAlign: 'right',
        position: 'absolute',
        bottom: 0,
        right: '.5em',
      },
      root: {
        backgroundColor: '#6E4D8B',
      }
    }
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
                <h2>13:00</h2>
              </div>
            </div>
            <center className="col-8">
              <Avatar
                src={userData.img ? "http://localhost:8080/images/" + userData.img : ""}
                size={150}
                style={styles.avatar}
              />
            </center>
            <div className="col-2" style={{position: 'relative'}}>
              <div style={styles.horaSaida}>
                <div>Saindo<br/>da<br/>Fatec</div>
                <h2>17:15</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
} 