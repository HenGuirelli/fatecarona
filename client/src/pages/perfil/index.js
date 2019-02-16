import React, { Component, Fragment } from 'react'
import DadosPessoais from '../../components/perfil/DadosPessoais'
import { Divider } from '@material-ui/core';
import PerfilMotorista from '../../components/perfil/motorista';

class Perfil extends Component {
	constructor(props) {
		super(props);  
	}

	render() {    
		return ( 
			<Fragment>
				<DadosPessoais />
				<Divider />
				<PerfilMotorista />
			</Fragment>

		)
	}
}

export default Perfil
