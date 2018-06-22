import React, { Component } from 'react'
import AvatarHeader from '../../components/AvatarHeader'
import PerfilCaronista from '../../components/PerfilCaronista'
import PerfilMotorista from '../../components/PerfilMotorista'


export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      perfil: 'caronista'
    };
  }

  handleClick(perfil) {
    this.setState({
      perfil: perfil
    })
  }


  render() {
    const { userData } = this.props

    const styles = {
      content: {
        'backgroundColor': 'white',
      },
      tab:{
        backgroundColor: '#D2D3D5',
        height: '2.5em',
        margin: 0
      }
    }

    return (
      <div className="pageBase">
        <AvatarHeader userEmail={userData.email}/>
        {
          userData.motorista === 1 ?
          <ul className="nav nav-pills row" id="pills-tab" role="tablist" style={styles.tab}>
            <li className="col-6" style={{padding: 0, border: '2px solid white'}}>
              <label className="nav-link active" id="pills-andamento-tab" data-toggle="pill" role="tab" aria-selected="true" onClick={() => this.handleClick("caronista")}>
                <center>Caronista</center>
              </label>
            </li>
            <li className="col-6" style={{padding: 0, border: '2px solid white', borderLeft: 'none'}}>
              <label className="nav-link" id="pills-historico-tab" data-toggle="pill" role="tab" aria-selected="false" onClick={() => this.handleClick("motorista")}>
                <center>Motorista</center>
              </label>
            </li>
          </ul>
          : null
        }
        {
          this.state.perfil === 'caronista' ?
            <PerfilCaronista
              userEmail = {userData.email}
            />
          :
            <PerfilMotorista
              userEmail = {userData.email}
            />
        }
      </div>
    )
  }
}
