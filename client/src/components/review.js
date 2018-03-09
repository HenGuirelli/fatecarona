import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { Rating } from 'material-ui-rating'

export default class Review extends Component {
  render() {
    const { userData, autor, rating, comentario } = this.props

    const styles = {
      root: {
        backgroundColor: '#fff',
        borderRadius: '1em',
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
          </div>
          <div className="col-9 col-xl-11">
            <h4>{autor}</h4>
            <Rating
              value={rating}
              readOnly={true}
              style={{marginLeft: '-12px'}}
              itemStyle={{width: '5em'}}
            />
            <div>
              {comentario}
            </div>
          </div>
        </div>
      </div>
    )
  }
}