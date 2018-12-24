import React, { Component } from 'react'
import CarIcon  from './veiculo_preto.png'

export default class Veiculo extends Component {
  render() {
    const { marca, modelo, placa, ativo } = this.props

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
            <img style={{width: '4em', height: '1.7em', margin:'0'}} src={CarIcon} alt={"Car Logo"}/>
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
