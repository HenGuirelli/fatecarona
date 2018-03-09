import React, { Component } from 'react'

export default class Plate extends Component {
  render() {

    const styles = {
      plateNum: {
        fontSize: '3.5em',
        marginTop: '-91px'
      },
      root: {
        paddingTop: '5em',
      },
      plate: {
        maxWidth: '100%',
        height: 'auto',
        margin: '32px 0 .5em 0'
      }
    }

    return(
      <center style={styles.root}>
      <h4>Veículo ativo</h4>
      <div style={styles.plate}>
        <img className="img-fluid" src={require('./plate.png')} style={styles.plate} alt="..."/>
        <div style={styles.plateNum}>AAA-1111</div>
      </div>
      <div>Pajero full</div>
      <div>Mitsubishi</div>
      </center>
    )
  }
} 