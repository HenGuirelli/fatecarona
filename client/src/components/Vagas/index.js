import React, { Component } from 'react'

export default class Vagas extends Component {
  render() {

    const styles = {
      root: {
        paddingTop: '5em',
      },
      vagas: {
        fontSize: '5em',
        verticalAlign: 'middle',
      },
      info: {
        marginTop: '2em',
      }
    }

    return(
      <center style={styles.root}>
      <h4>Lugares disponíveis</h4>
      <div style={styles.info}>
        <span style={styles.vagas}>7</span>
      </div>
      </center>
    )
  }
}
