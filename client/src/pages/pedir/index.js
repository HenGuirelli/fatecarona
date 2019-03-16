import React, { Component } from 'react'
import DataHora from '../../components/Carona/DataHora'
import Destino from '../../components/Carona/Destino'
import Trajeto from '../../components/Carona/Trajeto'
import Preferencia from '../../components/Carona/Preferencia'
import Button from '../../components/Form/Button'
import { Divider, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import CarpoolHttp from '../../http/Carpool'
import { isNotNullOrEmpty } from '../../utils'
import './style.css'

class Pedir extends Component {

	search = () => {
		console.log('chamou')
		const { date, email, hour } = this.props
		console.log({ date, email, hour })
		console.log('isValid: ', this.isValidToSearch())
		if (this.isValidToSearch()){
			CarpoolHttp.searchCarpools({ date, email, hour })
			.then(resolve => {
				const result = resolve.data
				console.log(result)
				if (result.success){
					/* TODO: redirecionar para pagina de resultados */
				}
			})
			.catch(err => { /* TODO: mensagem de erro */ })
			
		}
	}

	isValidToSearch = () => {
		const { date, email, hour } = this.props
		return isNotNullOrEmpty(date) && isNotNullOrEmpty(email) && isNotNullOrEmpty(hour)
	}

  	render() {
		return (
			<main className='page-pedir-carona'>				
				<DataHora />
				<Divider />

				<Destino />
				<Divider />

				<Trajeto />
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
})(Pedir)
