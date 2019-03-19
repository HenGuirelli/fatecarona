import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ProfileHttp from '../../http/Profile'
import CarpoolHttp from '../../http/Carpool'
import { formatDateToView } from '../../utils'
import Button from '../Form/Button'
import './style.css'
import { CircularProgress } from '@material-ui/core'
import PopUp, { TIPO } from '../PopUp'

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

	getNickOrName = async () => {
		const { email } = this.props
		const resolve = await ProfileHttp.getProfileData({ email })
		const result = resolve.data

		if (result.success){
			return result.nick || result.name
		}else{
			// TODO: mensagem de erro
		}
	}

	iWant = async () => {
		const { id, email } = this.props.carpool
		const nameOrNick = await this.getNickOrName()
		CarpoolHttp.iWantCarpool({ carpoolId: id, nameOrNick, email })
		.then(resolve => { PopUp({ tipo: TIPO.SUCESSO, text: 'Pedido enviado' }) })
		.catch(err => PopUp({ tipo: TIPO.ERRO, text: 'Erro ' + err.toString() }))
	}

	render() {
		const { driverName } = this.state
		const { car, date, destination, hour } = this.props.carpool
		// TODO: colocar avatar da pessoa aqui
		if (this.state.loading){
			return <CircularProgress />
		}
		return (
			<div className='info-carona'>
				{ driverName } está oferendo Carona em um { car.brand } { car.model } em { formatDateToView(date) } <br />
				{ this.formatDestination(destination) }<br />
				horário de encontro às { hour }<br />
				<p>3 vagas restantes</p>
				<div className='buttons'>
					<Button onClick={ this.iWant }>EU QUERO!</Button>
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
