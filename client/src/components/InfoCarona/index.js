import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ProfileHttp from '../../http/Profile'
import { formatDateToView } from '../../utils'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '../Form/Button'
import './style.css'

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
			// TODO: PELOAMORDEDEUS tirar do timeout
			setTimeout(() => this.setState({ loading: false }), 2000 )
		})
	}

	formatDestination = destination => destination === 'TO_FATEC' ? 'Saindo da FATEC' : 'Indo para FATEC'

	render() {
		const { driverName } = this.state
		const { car, date, destination, hour, id } = this.props.carpool
		// TODO: colocar avatar da pessoa aqui
		if (this.state.loading){
			return <LinearProgress />
		}
		return (
			<div className='info-carona'>
				{ driverName } está oferendo Carona em um { car.brand } { car.model } em { formatDateToView(date) } <br />
				{ this.formatDestination(destination) }<br />
				horário de encontro às { hour }<br />
				<p>3 vagas restantes</p>
				<div className='buttons'>
					<Button>EU QUERO!</Button>
					<Button variant='outlined'>Espiar motorista</Button>
				</div>
			</div>
		)
	}
}

export default connect(store => {
  return {
    email: store.user.email
  }
})(InfoCarona)
