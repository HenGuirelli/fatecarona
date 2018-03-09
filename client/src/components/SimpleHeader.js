import React, { Component } from 'react'

export default class SimpleHeader extends Component {
  render() {
    const { title } = this.props

    return(
      <center style={{backgroundColor: '#6E4D8B', padding: '1em 0'}}>
        <h1 style={{color: '#A8CF45'}}>
          {title}
        </h1>
      </center>
    )
  }
}