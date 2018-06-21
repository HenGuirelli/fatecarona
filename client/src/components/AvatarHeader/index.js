import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import config from '../../config.json'
import styles from './styles'
import axios from 'axios'

export default class AvatarHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      userData: {},
    };
  }

  loadDriver = (userEmail) =>{
    axios.get(config.endpoint + "/members/" + userEmail)
      .then(result =>{
          this.setState({ userData: result.data })
      })
  }

  render() {
    const { userData } = this.state
    const { userEmail } = this.props
    if (userData.img === undefined && userEmail !== undefined) this.loadDriver(userEmail)
    return(
      <div style={styles.root}>
        <center>

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

              <div style={styles.apelido}>{userData.apelido}</div>
              <div style={styles.status}>Oferecendo Carona</div>
              <Avatar
                src={userData.img ? config.endpoint + "/images/" + userData.img : ""}
                size={90}
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
