import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { Rating } from 'material-ui-rating'

export default class Lift extends Component {
  render() {
    const { userData, action, date, desc, rating } = this.props

    const styles = {
      greenBar: {
        backgroundColor: '#77bf42',
        height: '4em',
        width: '1em',
        margin: '-10px 0 -10px 17px'
      },
      root: {
        margin: '1em',
        padding: '1em',
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
            <div style={styles.greenBar}/>
            <Avatar
              src={userData.img ? "http://localhost:8080/images/" + userData.img : ""}
              size={50}
            />
          </div>
          <div className="col-9 col-xl-11">
            <h4>{action}</h4>
            <Rating
              value={rating}
              readOnly={true}
              style={{marginLeft: '-12px'}}
              itemStyle={{width: '5em'}}
            />
            <div>
              {date}<br/>
              {desc}
            </div>
          </div>
        </div>
      </div>
    )
  }
}