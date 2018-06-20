import React, { Component } from 'react'
import AvatarHeader from '../../components/AvatarHeader'
import { connect } from 'react-redux'
import { sendSubscription } from '../../actions/notificationActions.js'
import InfoVeiculo from '../../components/InfoVeiculo'
import Avaliador from '../../components/Avaliador'
import { loadCar } from '../../actions/carActions'

class MainPage extends Component {
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

  componentWillMount() {
    this.props.dispatch(loadCar(this.props.userData.email))
  }

  render() {
    const { userData, veiculos } = this.props

    const styles = {
      content: {
        'backgroundColor': 'white',
      },
      text:{
        fontSize: '22px',
        font: 'bold'
      },
      radiobtn: {
        display:'none',
      }
    }

    if( userData.email !== undefined) this.checkSubscription(userData.email);

    return (
      <div className="pageBase">
        <AvatarHeader userData={userData}/>

        <div className="container">

          <ul className="nav nav-pills row" id="pills-tab" role="tablist">
            <li className="nav-item col-6">
              <label className="nav-link active" id="pills-andamento-tab" data-toggle="pill" role="tab" aria-selected="true">
                <center>Caronista</center>
              </label>
            </li>
            <li className="nav-item col-6">
              <label className="nav-link" id="pills-historico-tab" data-toggle="pill" role="tab" aria-selected="false">
                <center>Motorista</center>
              </label>
            </li>
          </ul>

          <div style={styles.content}>
            <div className="row">
              <div className="col-6">
                <Avaliador
                  text="Avaliação"
                  score={3.5}
                />
              </div>
              <div className="col-6" style={{marginTop:'1em'}}>
                <center>
                  <div style={styles.text}>38</div>
                  Caronas Realizadas<br/><br/>
                  <div style={styles.text}>21</div>
                  Caronas Avaliadas<br/><br/>
                  <div style={styles.text}>5</div>
                  Caronas 5 estrelas
                </center>
              </div>
            </div>
            <div style={{marginTop: '40px'}}>
              <center><h4>VEÍCULOS ATIVOS</h4></center>
              <div >
                {
                  veiculos.map((veiculo, key) => {
                    if (veiculo.ativo) {
                      return <InfoVeiculo
                              marca={veiculo.marca}
                              modelo={veiculo.modelo}
                              placa={veiculo.placa}
                              key={key}
                            />
                    }
                    return null
                  }
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    user: store.user.user,
    userData: store.user.userData,
    veiculos: store.car.veiculos,
  }
})(MainPage)
