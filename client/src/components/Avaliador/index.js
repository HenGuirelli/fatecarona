import React, { Component } from 'react'
import styles from './styles'

export default class Avaliador extends Component {
  render() {
    const { text, score } = this.props

    return(
      <center style={styles.root}>
      <h4>{text}</h4>
      <div style={styles.info}>
        <img src={require('./star.png')} style={styles.img} alt="..."/>
        <div style={styles.score}>{score}</div>
      </div>
      </center>
    )
  }
}
