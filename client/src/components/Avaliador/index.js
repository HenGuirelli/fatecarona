import React, { Component } from 'react'
import styles from './styles'

export default class Avaliador extends Component {
  render() {
    return(
      <center style={styles.root}>
      <h4>Avaliação</h4>
      <div style={styles.info}>
        <img src={require('./star.png')} style={styles.img} alt="..."/>
        <div style={styles.score}>6.5</div>
      </div>
      </center>
    )
  }
}
