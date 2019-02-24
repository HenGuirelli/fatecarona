import React, { Component } from 'react'
import DataHora from '../../components/Carona/DataHora'
import Destino from '../../components/Carona/Destino'
import Trajeto from '../../components/Carona/Trajeto'
import Preferencia from '../../components/Carona/Preferencia'
import Veiculos from '../../components/Carona/Veiculos'
import Button from '../../components/Form/Button'
import { Divider, Typography } from '@material-ui/core'

const veiculos = [
	{
		marca: 'fiat',
		modelo: 'palio',
		placa: 'abc-1234'
	},
	{
		marca: 'fiat',
		modelo: 'palio',
		placa: 'abc-1234'
	},
	{
		marca: 'fiat',
		modelo: 'palio',
		placa: 'abc-1234'
	}
]

class Oferecer extends Component {

	render() {
		return (
			<main className='page-pedir-carona'>				
				<DataHora />
				<Divider />

				<Destino />
				<Divider />

				<Veiculos veiculos={veiculos}/>
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

export default Oferecer
