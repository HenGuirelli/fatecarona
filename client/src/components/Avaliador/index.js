import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
      <div style={{paddingTop: '38px'}}>
        <Link to="/avaliacoes">ver avaliações</Link>
      </div>
      </center>
    )
  }
}
