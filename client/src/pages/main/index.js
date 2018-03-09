import React, { Component } from 'react'
import AvatarHeader from '../../components/AvatarHeader'
import { connect } from 'react-redux'
import { sendSubscription } from '../../actions/notificationActions.js'
import CircBar from '../../components/CircBar'
import Plate from '../../components/Plate'
import Vagas from '../../components/Vagas'
import Avaliador from '../../components/Avaliador'

class MainPage extends Component {
  componentWillMount() {
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
              this.props.dispatch(sendSubscription(this.props.userData.email, sub));
            }
          });
        });   
      }
    }
  }

  subscribeUser() {
    navigator.serviceWorker.ready.then(reg => {
      reg.pushManager.subscribe({
        userVisibleOnly: true
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

  render() {
    const { userData } = this.props

    const styles = {
      content: {
        'backgroundColor': 'white',
      },
    }

    return (
      <div className="pageBase">
        <AvatarHeader userData={userData}/>
        <div style={styles.content} className="container-fluid">
          <div className="row">
            <div className="col-12 col-xl-6">
              <CircBar value={75}/>
            </div>
            <div className="col-12 col-xl-6">
              <Avaliador />
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