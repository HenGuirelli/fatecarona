import React, { Component } from 'react'
import AvatarHeader from '../../components/AvatarHeader'
import { connect } from 'react-redux'
import PerfilCaronista from '../../components/PerfilCaronista'
import PerfilMotorista from '../../components/PerfilMotorista'


class Home extends Component {
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
    const {userData, userEmail} = this.props

    const styles = {
      content: {
        'backgroundColor': 'white',
      },
      tab:{
        backgroundColor: '#D2D3D5',
        height: '2.5em'
      }
    }

    return (
      <div className="pageBase">
        <AvatarHeader userEmail={userEmail}/>

        <ul className="nav nav-pills row" id="pills-tab" role="tablist" style={styles.tab}>
          <li className="nav-item col-6">
            <label className="nav-link active" id="pills-andamento-tab" data-toggle="pill" role="tab" aria-selected="true" onClick={() => this.handleClick("caronista")}>
              <center>Caronista</center>
            </label>
          </li>
          <li className="nav-item col-6">
            <label className="nav-link" id="pills-historico-tab" data-toggle="pill" role="tab" aria-selected="false" onClick={() => this.handleClick("motorista")}>
              <center>Motorista</center>
            </label>
          </li>
        </ul>
        {
          this.state.perfil === 'caronista' ?
            <PerfilCaronista
              userEmail = {userEmail}
            />
          :
            <PerfilMotorista
              userEmail = {userEmail}
            />
        }
      </div>
    )
  }
}

export default connect(store => {
  return {
    user: store.user.user,
    userData: store.user.userData,
  }
})(Home)
