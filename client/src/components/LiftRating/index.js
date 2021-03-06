import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import config from '../../config.json'
import { Rating } from 'material-ui-rating'

export default class Lift extends Component {
  render() {
    const { userData, name, rating, text } = this.props

    const styles = {
      root: {
        margin: '1em'
      }
    }

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
            <h4>{name}</h4>
            <Rating
              value={rating}
              readOnly={true}
              style={{margin: '-12px 0 0 -12px'}}
              itemStyle={{width: '5em'}}
            />
            <div style={{marginTop: '-9px'}}>
              {text}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
