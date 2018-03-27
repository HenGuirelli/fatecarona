import React, { Component } from 'react'
import AvatarHeader from '../../components/AvatarHeader'
import { connect } from 'react-redux'
import { sendSubscription } from '../../actions/notificationActions.js'
import Plate from '../../components/Plate'
import Vagas from '../../components/Vagas'
import Avaliador from '../../components/Avaliador'

class MainPage extends Component {
  checkSubscription = (email) => {
    if ('Notification' in window && navigator.serviceWorker) {
      if (Notification.permission === "default") {
        Notification.requestPermission(status => {
          console.log('Notification permission status:', status);
        });
      } else if (Notification.permission === "granted") {
        navigator.serviceWorker.getRegistration().then(reg => {
          reg.pushManager.getSubscription().then(sub => {
            if (sub === null) {
              this.subscribeUser();
            } else {
              this.props.dispatch(sendSubscription(email, sub));
            }
          });
        });
      }
    }
  }

  subscribeUser() {
    const convertedVapidKey = this.urlBase64ToUint8Array("BJ1B8Ji8FNMFtm5hLzJbVjgpsV9Ct1dWIv9fpTIcHowwVFliX8W6BcWbvFdBuJFdL0VZzwR9pN1LSaINOGmj52Y")

    navigator.serviceWorker.ready.then(reg => {
      reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      }).then(sub => {
        console.log('Endpoint URL: ', sub.endpoint);
      }).catch(e => {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Unable to subscribe to push', e);
        }
      });
    })
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

  render() {
    const { userData } = this.props

    const styles = {
      content: {
        'backgroundColor': 'white',
      },
    }

    if( userData.email !== undefined) this.checkSubscription(userData.email);

    return (
      <div className="pageBase">
        <AvatarHeader userData={userData}/>
        <div style={styles.content} className="container-fluid">
          <div className="row">
            <div className="col-12 col-xl-6">
              <Avaliador
                text="AVALIAÇÃO COMO CARONISTA"
                score={3.5}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-xl-6">
              <Plate />
            </div>
            <div className="col-12 col-xl-6">
              <Vagas />
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
    userData: store.user.userData
  }
})(MainPage)
