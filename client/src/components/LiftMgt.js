import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'

export default class Lift extends Component {
  render() {
    const { userData, text } = this.props

    const styles = {
      root: {
        margin: '1em',
        padding: '1em',
      },
      btn: {
        fontSize: '10px',
        width: '100%',
      },
      btnContainer: {
        padding: '0 10px',
      }
    }

    return(
      <div className="container" style={styles.root}>
        <div className="row">
          <div className="col-3 col-xl-1">
            <Avatar
              src={userData.img ? "http://localhost:8080/images/" + userData.img : ""}
              size={50}
            />
          </div>
          <div className="col-9 col-xl-11">
            <div>
              {text}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6" style={styles.btnContainer}>
            <input type="button" style={styles.btn} className="btn btn-primary" value="GERENCIAR" />
          </div>
          <div className="col-6" style={styles.btnContainer}>
            <input type="button" style={styles.btn} className="btn btn-primary" value="ESPIAR MOTORISTA" />
          </div>
        </div>
      </div>
    )
  }
}