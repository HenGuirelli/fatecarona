import React, { Component } from 'react'
import AvatarHeader from '../../components/AvatarHeader'
import { connect } from 'react-redux'
import { sendSubscription } from '../../actions/notificationActions.js'
import CircBar from '../../components/CircBar'

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
      wrapper: {
        overflow: 'hidden',
      },
      content: {
        paddingBottom: '5000px',
        marginBottom: '-5000px', 
        'backgroundColor': 'white',
      },
    }

    return (
      <div style={styles.wrapper}>
        <AvatarHeader userData={userData}/>
        <div style={styles.content}>
          <CircBar value={75}/>
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