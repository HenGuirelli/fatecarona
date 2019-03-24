import React, { Component } from 'react'
import CadastrarVeiculo from '../../components/Veiculo/CadastrarVeiculo'

class CadVeiculos extends Component{
	constructor(props) {
		super(props)
	}

	render(){
		return(
			<CadastrarVeiculo withButton={this.props.withButton} trackState={this.props.trackState} />
		)
	}
}

export default CadVeiculos
