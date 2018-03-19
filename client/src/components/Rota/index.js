import React, { Component } from 'react'
import CarIcon from 'material-ui/svg-icons/maps/directions-car'

export default class Rota extends Component {
  render() {
    const { id, desc, origem, destino } = this.props

    const styles = {
      root: {
        margin: '1em',
        padding: '1em',
      },
      descSize:{
        fontSize:'13px'
      }
    }

    return(
      <div className="container" style={styles.root}>
        <div className="row">
          <div className="col-1">
            <CarIcon color="#000" style={{width: '2em', height: '2em', margin:'0'}}/>
          </div>
          <div className="col">
            <div style={styles.descSize}>
              {desc}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
