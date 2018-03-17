import React, { Component } from 'react'

export default class SimpleHeader extends Component {
  render() {
    const { title } = this.props

    return(
      <center style={{backgroundColor: 'transparent', position: 'absolute', top: 0}}>
        <h1 style={{color: '#fff'}}>
          {title}
        </h1>
      </center>
    )
  }
}
