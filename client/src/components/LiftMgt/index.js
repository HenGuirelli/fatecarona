import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import LiftRating from '../LiftRating'
import config from '../../config.json'
import styles from './styles'
import { connect } from 'react-redux'

class Lift extends Component {
  render() {
    const { userData, infomotorista, caronista, data, tipo } = this.props
    window.comp = LiftRating
    return(
      <div className="container" style={styles.root}>
        <div className="row">
          <div className="col-3 col-xl-1">
            <Avatar
              src={userData.img ? config.endpoint + "/images/" + userData.img : ""}
              size={50}
            />
          </div>
          <div className="col-9 col-xl-11">
            {
              caronista === 1 ?
              <div style={styles.descSize}>
                <span>VOCÊ está aguardando resposta de </span>{infomotorista}
                <span>para carona em </span>{data} {tipo}
              </div>
              :
              <div style={styles.descSize}>
                <span>VOCÊ está oferecendo carona em </span> {data} {tipo}
              </div>
            }
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
