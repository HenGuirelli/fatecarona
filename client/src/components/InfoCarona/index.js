import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProfileHttp from '../../http/Profile'
import { formatDateToView } from '../../utils'

class InfoCarona extends Component {
	state = {
		loading: true,
		driverName: undefined
	}

	componentDidMount(){
		const { email } = this.props.carpool
		ProfileHttp.getProfileData({ email })
		.then(resolve => {
			const result = resolve.data
			this.setState({ driverName: result.apelido || result.name })
		})
	}

	formatDestination = destination => destination === 'TO_FATEC' ? 'Saindo da FATEC' : 'Indo para FATEC'

	render() {
		const { driverName } = this.state
		const { car, date, destination, hour } = this.props.carpool

		return (
			<div>
				{ driverName } está oferendo Carona em um { car.brand } { car.model } em { formatDateToView(date) } <br />
				{ this.formatDestination(destination) }<br />
				horário de encontro às { hour }<br />
				<p>3 vagas restantes</p>
				<button>EU QUERO</button>
				<button>Espiar motorista</button>
			</div>
		)
	}
}

export default connect(store => {
  return {
    email: store.user.email
  }
})(InfoCarona)
