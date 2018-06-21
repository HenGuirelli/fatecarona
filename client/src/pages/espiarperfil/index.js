import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from '../../components/Home'


class EspiarPerfil extends Component {

  render() {
    const {membroEspiado} = this.props
    return (
      <div className="pageBase">
        <Home
          userData = {membroEspiado}
        />
      </div>
    )
  }
}

export default connect(store => {
  return {
    membroEspiado: store.lift.membroEspiado,
  }
})(EspiarPerfil)
