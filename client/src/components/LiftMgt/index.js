import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import LiftRating from '../LiftRating'
import config from '../../config.json'
import styles from './styles'
import { connect } from 'react-redux'

class Lift extends Component {
  render() {
    const { userData, text } = this.props
    window.comp = LiftRating
    return(
      <div className="container" style={styles.root}>
        <div className="row" style={{borderBottom: '1px solid grey'}}>
          <LiftRating
            userData={userData}
            name="Thiago"
            rating={4}
            text="I don't like this"
          />
        </div>
        <div className="row">
          <div className="col-3 col-xl-1">
            <Avatar
              src={userData.img ? config.endpoint + "/images/" + userData.img : ""}
              size={50}
            />
          </div>
          <div className="col-9 col-xl-11">
            <div>
              {text}
            </div>
          </div>
        </div>
        <div className="row" style={{bottom: 0, width: '100%'}}>
          <div className="col-6" style={styles.btnContainer}>
            <input type="button" style={styles.btn} className="btn btn-primary" value="GERENCIAR" />
          </div>
          <div className="col-6" style={styles.btnContainer}>
            <input type="button" style={styles.btn2} className="btn btn-primary" value="ESPIAR MOTORISTA" />
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
})(Lift)
