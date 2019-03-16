import React, { Component } from 'react'
import Veiculo from '../../components/Veiculo/ListVeiculo'
import Button from '../../components/Form/Button'
import { connect } from 'react-redux'
import CarsHttp from '../../http/Car'
import './style.css'
import { Link } from 'react-router-dom';

class Veiculos extends Component{
	state = {
		cars: []
	}

	componentDidMount(){
		this.updateView()
	}

	updateView = () => {
		CarsHttp.getCars({ email: this.props.email })
		.then(resolve => {
			const result = resolve.data
			this.setState({ cars: result })
		})
	}

	render(){
		return (
			<div className='page-veiculos'>
				<Veiculo veiculos={this.state.cars} updateView={this.updateView}/>
				<center>
					<Link to='veiculos/cadastrar'>
						<Button className='btn-adicionar'>
							Adicionar 
						</Button>
					</Link>
				</center>
			</div>
		)      
	}
}

export default connect(store => {
	return {
		email: store.user.email
	}
})(Veiculos)
