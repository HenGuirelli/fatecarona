import React, { Component } from 'react'
import AvatarHeader from '../../components/AvatarHeader'
import { connect } from 'react-redux'

class MainPage extends Component {
  componentDidMount() {
    if ('Notification' in window && navigator.serviceWorker) {
      if (Notification.permission === "default") { 
        Notification.requestPermission((status) => {
          console.log('Notification permission status:', status);
        }); 
      } 
    }
  }

  displayNotification() {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: 'Alguem pediu uma carona a você',
          icon: '../../../public/favicon-32x32.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        };
        reg.showNotification('Fatecarona', options);
      });
    }
  }

  render() {
    window.disNot = this.displayNotification.bind(this)
    return (
      <div>
        <AvatarHeader userData={this.props.userData}/>
        <div style={{'height': '500px', 'backgroundColor': 'white'}}>
          Content
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