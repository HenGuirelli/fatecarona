import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from '../../components/Home'


class EspiarPerfil extends Component {

  render() {
    const {carona} = this.props
    return (
      <div className="pageBase">
        <Home
          userEmail = {carona.emailMotorista}
        />
      </div>
    )
  }
}

export default connect(store => {
  return {
    carona: store.lift.carona,
  }
})(EspiarPerfil)
