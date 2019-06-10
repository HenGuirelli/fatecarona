import React, { Component } from 'react'
import DataHora from '../../components/Carona/DataHora'
import Destino from '../../components/Carona/Destino'
import Trajeto from '../../components/Carona/Trajeto'
import Preferencia from '../../components/Carona/Preferencia'
import Button from '../../components/Form/Button'
import { Divider, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { isNotNullOrEmpty, redirect } from '../../utils'
import { withRouter } from 'react-router-dom'
import './style.css'

class Pedir extends Component {

	search = () => {
		const { date, email, hour } = this.props
		if (this.isValidToSearch()){	
			this.props.history.push('/caronas/resultados')			
		}
	}

	isValidToSearch = () => {
		const { date, email, hour } = this.props
		return isNotNullOrEmpty(date) && isNotNullOrEmpty(email) && isNotNullOrEmpty(hour)
	}

  	render() {
		return (
			<main className='page-pedir-carona'>				
				<DataHora withWeekdays={false} />
				<Divider />

				<Destino />
				<Divider />

				<Trajeto withRedirect={ false } />
				<Divider />

				<Preferencia />
				<Divider />

				<Typography align='center' component='div' className='btn-buscar-wrapper'>
					<Button className='btn-buscar' onClick={ this.search }>Buscar</Button>
				</Typography>				
			</main>
		)
  	}
}

export default connect(store => {
	return {
		email: store.user.email,
		date: store.carpool.date,
		hour: store.carpool.hour
	}
})(withRouter(Pedir))
