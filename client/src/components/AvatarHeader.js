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
        position: 'absolute',
        bottom: '-20px',
        right: '-75px',
      },
      status: {
        color: '#A8CF45',
      },
      background: {
        backgroundColor: '#6E4D8B', 
        height: '150px',
      },
      horaChegada: {
        color: 'white',
        textAlign: 'left',
        position: 'absolute',
        bottom: '15px',
        left: '15px',
      },
      horaSaida: {
        color: 'white',
        textAlign: 'right',
        position: 'absolute',
        bottom: '15px',
        right: '15px',
      },
    }
    return(
      <div>
        <center>
          <div style={styles.nome}>{userData.nome}</div>
          <div style={styles.status}>Oferecendo Carona</div>
        </center>
        <div className="container">
          <div className="row" style={styles.background}>
            <div className="col" style={{position: 'relative'}}>
              <div style={styles.horaChegada}>
                <div>Chegando na Fatec</div>
                <h1>13:00</h1>
              </div>
              <Avatar
                src={userData.img ? "http://localhost:8080/images/" + userData.img : ""}
                size={150}
                style={styles.avatar}
              />
            </div>
            <div className="col" style={{position: 'relative'}}>
              <div style={styles.horaSaida}>
                <div>Saindo da Fatec</div>
                <h1>17:15</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
} 