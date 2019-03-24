import React, { Component } from 'react'
import { connect } from 'react-redux'
import InfoCarona from '../../components/InfoCarona';

const member = {
	name: 'robson',
	email: 'aa',

}

class EspiarPerfil extends Component {
	render() {
		const { member } = this.props
		return (
			<InfoCarona member={member} />
		)
	}
}

export default connect(store => {
  return {
    membroEspiado: store.lift.membroEspiado,
  }
})(EspiarPerfil)
