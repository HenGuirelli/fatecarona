import React, { Component } from 'react'
import AvatarHeader from '../../components/AvatarHeader'
import { connect } from 'react-redux'
import { sendSubscription } from '../../actions/notificationActions.js'
import PerfilCaronista from '../../components/PerfilCaronista'
import PerfilMotorista from '../../components/PerfilMotorista'


class MainPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      perfil: 'caronista'
    };
  }
  checkSubscription = (email) => {
    if ('Notification' in window && navigator.serviceWorker) {
      if (Notification.permission === "default") {
        Notification.requestPermission(status => {
          if (status === "granted") {
            this.subscribeUser(email)
          }
        });
      } else if (Notification.permission === "granted") {
        this.subscribeUser(email)
      }
    }
  }

  subscribeUser(email) {
    const convertedVapidKey = this.urlBase64ToUint8Array("BJ1B8Ji8FNMFtm5hLzJbVjgpsV9Ct1dWIv9fpTIcHowwVFliX8W6BcWbvFdBuJFdL0VZzwR9pN1LSaINOGmj52Y")

    navigator.serviceWorker.getRegistration().then(reg => {
      reg.pushManager.getSubscription().then(sub => {
        if (sub === null) {
          navigator.serviceWorker.ready.then(reg => {
            reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidKey
            }).then(sub => {
              this.props.dispatch(sendSubscription(email, sub))
            }).catch(e => {
              if (Notification.permission === 'denied') {
                console.warn('Permission for notifications was denied');
              } else {
                console.error('Unable to subscribe to push', e);
              }
            });
          })
        } else {
          this.props.dispatch(sendSubscription(email, sub))
        }
      });
    });
  }

  urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  handleClick(perfil) {
    this.setState({
      perfil: perfil
    })
  }


  render() {
    const { userData} = this.props

    const styles = {
      content: {
        'backgroundColor': 'white',
      },
      tab:{
        backgroundColor: '#D2D3D5',
        height: '2.5em'
      }
    }

    if( userData.email !== undefined) this.checkSubscription(userData.email);

    return (
      <div className="pageBase">
        <AvatarHeader userData={userData}/>

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
            <PerfilCaronista />
          :
            <PerfilMotorista />
        }
      </div>
    )
  }
}

export default connect(store => {
  return {
    user: store.user.user,
    userData: store.user.userData,
    veiculos: store.car.veiculos,
    needLoad: store.car.needLoad,
  }
})(MainPage)
