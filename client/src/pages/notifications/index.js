import React, { Component } from 'react'
import MgtCaronista from '../../components/MgtCaronista'
import { connect } from 'react-redux'
import { getNotifications } from '../../actions/notificationActions'

class Notifications extends Component {
  componentWillMount() {
    const { userData } = this.props
    if (userData.email !== undefined) {
        this.props.dispatch(getNotifications(userData.email))
    }
  }

  render() {
    const { notifications, userData } = this.props
    return (
      <div>
        {
          notifications.filter(e => e.read !== true).length > 0 ?
          notifications.map((e, key) => {
            if (e.read !== true) {
              return <MgtCaronista key={key} infoNotification={e} userData={userData}/>
            }
            return null
          }) :
          <div>Não há notificações</div>
        }
      </div>
    )
  }
}

export default connect(store => {
  return {
    userData: store.user.userData,
    notifications: store.user.notifications
  }
})(Notifications)
