import React, { Component } from 'react'
import TrajetoIcon from './trajeto.png'

export default class Rota extends Component {
  render() {
    const { id, desc, origem, destino } = this.props

    const styles = {
      root: {
        margin: '1em',
        padding: '1em',
      },
      descSize:{
        marginTop: '14px',
        fontSize:'13px'
      }
    }

    return(
      <div className="container" style={styles.root}>
        <div className="row">
          <div className="col-1">
            <img style={{width: '2.7em', height: '3em', margin:'0'}} src={TrajetoIcon} alt={"Trajeto Logo"}/>
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
