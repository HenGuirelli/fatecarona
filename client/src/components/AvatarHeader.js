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
      },
      status: {
        color: '#A8CF45',
      },
      background: {
        backgroundColor: '#6E4D8B', 
        height: '137px',
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
      hora: {
        fontWeight: 'bold',
        fontSize: '30px',
      }
    }
    return(
      <div>
        <center>
          <div style={styles.nome}>{userData.nome}</div>
          <div style={styles.status}>Oferecendo Carona</div>
        </center>
        <div className="container" style={styles.background}>
          <div className="row">
            <div className="col">
              <div style={styles.horaChegada}>
                <div>Chegando na Fatec</div>
                <div style={styles.hora}>13:00</div>
              </div>
            </div>
            <center className="col">
              <Avatar
                src={userData.img ? "http://localhost:8080/images/" + userData.img : ""}
                size={150}
                style={styles.avatar}
              />
            </center>
            <div className="col">
              <div style={styles.horaSaida}>
                <div>Saindo da Fatec</div>
                <div style={styles.hora}>17:15</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
} 