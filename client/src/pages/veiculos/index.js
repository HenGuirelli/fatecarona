import React, { Component } from 'react'
import Veiculo from '../../components/Veiculo/ListVeiculo'
import Button from '../../components/Form/Button'
import './style.css'

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

class Veiculos extends Component{
	render(){
		return (
		<div className='page-veiculos'>
			<Veiculo veiculos={veiculos} />
			<center>
					<Button onClick={() => window.location.href = '/veiculos/cadastrar'} className='btn-adicionar'>
						Adicionar 
					</Button>
			</center>
		</div>
		)      
	}
}

export default Veiculos
