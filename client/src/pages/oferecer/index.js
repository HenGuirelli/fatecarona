import React, { Component } from 'react'
import DataHora from '../../components/Carona/DataHora'
import Destino from '../../components/Carona/Destino'
import Trajeto from '../../components/Carona/Trajeto'
import Preferencia from '../../components/Carona/Preferencia'
import Veiculos from '../../components/Carona/Veiculos'
import Button from '../../components/Form/Button'
import { Divider, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import CarHttp from '../../http/Car'

class Oferecer extends Component {
	state = {
		cars: []
	}

	componentDidMount(){
		this.searchCars()
	}

	searchCars = () => {
		const { email } = this.props
		CarHttp.getCars({ email })
		.then(resolve => {
			const result = resolve.data
			this.setState({ cars: result })
		})
		.catch(err => { /* TODO: exibir mensagem de erro */ })
	}

	render() {
		const { cars } = this.state
		return (
			<main className='page-pedir-carona'>				
				<DataHora />
				<Divider />

				<Destino />
				<Divider />

				<Veiculos cars={cars}/>
				<Divider />
				
				<Trajeto />
				<Divider />

				<Preferencia />
				<Divider />

				<Typography align='center' component='div' className='btn-buscar-wrapper'>
					<Button className='btn-buscar'>Buscar</Button>
				</Typography>				
			</main>
		)
	}
}

export default connect(store => {
	return {
		email: store.user.email	
	}
})(Oferecer)
