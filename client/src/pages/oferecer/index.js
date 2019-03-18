import React, { Component } from 'react'
import DataHora from '../../components/Carona/DataHora'
import Destino from '../../components/Carona/Destino'
import Trajeto from '../../components/Carona/Trajeto'
import Preferencia from '../../components/Carona/Preferencia'
import Veiculos from '../../components/Carona/Veiculos'
import Button from '../../components/Form/Button'
import { Divider, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { isNotNullOrEmpty } from '../../utils'
import CarpoolHttp from '../../http/Carpool'
import { withRouter } from 'react-router-dom'

class Oferecer extends Component {
	fetchData = ({ car, destination, date, hour, flow, preferences }) => {
		return {
			email: this.props.email,
			date,
			hour,
			carPlate: car.plate,
			flowId: flow.id,
			destination,
			isSmokerAllowed: preferences.isSmokerAllowed,
			isMusicAllowed: preferences.isMusicAllowed,
			isWheelchairAccommodation: preferences.isWheelchairAccommodation
		}
	}

	offer = () => {
		const { car, destination, date, hour, flow, preferences } = this.props
		if (this.isValidToOffer()){
			CarpoolHttp.offerCarpool(this.fetchData({ car, destination, date, hour, flow, preferences }))
			.then(resolve => {
				const result = resolve.data
				if(result.success){
					this.props.history.push('/')
				}
			})
			.catch(err => { /* TODO: mensagem de erro */ })
		}
	}

	isValidToOffer = () => {
		const { car, destination, date, hour, flow } = this.props
		return isNotNullOrEmpty(car) && isNotNullOrEmpty(destination) && 
			   isNotNullOrEmpty(date) && isNotNullOrEmpty(hour) && isNotNullOrEmpty(flow)
	}

	render() {
		return (
			<main className='page-pedir-carona'>				
				<DataHora />
				<Divider />

				<Destino />
				<Divider />

				<Veiculos />
				<Divider />
				
				<Trajeto />
				<Divider />

				<Preferencia />
				<Divider />

				<Typography align='center' component='div' className='btn-buscar-wrapper'>
					<Button className='btn-buscar' onClick={ this.offer }>Buscar</Button>
				</Typography>				
			</main>
		)
	}
}

export default connect(store => {
	return {
		email: store.user.email,
		date: store.carpool.date,
		hour: store.carpool.hour,
		destination: store.carpool.destination,
		flow: store.flow,
		preferences: { 
			isMusicAllowed: store.carpool.isMusicAllowed,
			isSmokerAllowed: store.carpool.isSmokerAllowed,
			isWheelchairAccommodation: store.carpool.isWheelchairAccommodation,
		},
		car: store.car

	}
})(withRouter(Oferecer))
