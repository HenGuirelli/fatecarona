import React, { Component } from 'react'

export default class Avaliador extends Component {
  render() {

    const styles = {
      root: {
        paddingTop: '5em',
      },
      info: {
        marginTop: '2em',
      },
      img: {
        height: 'auto',
        width: '10em',
      },
      score: {
        fontSize: '3em',
        marginTop: '-104px'
      }
    }

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