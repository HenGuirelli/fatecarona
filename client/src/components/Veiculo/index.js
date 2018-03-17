import React, { Component } from 'react'
import CarIcon from 'material-ui/svg-icons/maps/directions-car'

export default class Veiculo extends Component {
  render() {
    const { marca, modelo, placa } = this.props

    const styles = {
      root: {
        margin: '1em',
        padding: '1em',
      },
      descSize:{
        fontSize:'13px'
      },
      placaSize:{
        fontSize:'20px'
      }
    }

    return(
      <div className="container" style={styles.root}>
        <div className="row">
          <div className="col-1">
            <CarIcon color="#000" style={{width: '2em', height: '2em', margin:'0'}}/>
          </div>
          <div className="col">
            <div style={styles.descSize}>{marca},{modelo}</div>
            <div style={styles.placaSize}>{placa}</div>
          </div>
          </div>
        </div>
    )
  }
}
