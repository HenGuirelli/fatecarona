import React, { Component } from 'react'
import AvatarHeader from '../../components/AvatarHeader'
import { connect } from 'react-redux'

class MainPage extends Component {
  render() {
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