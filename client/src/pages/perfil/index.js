import React, { Component, Fragment } from 'react'
import DadosPessoais from '../../components/perfil/DadosPessoais'
import { Divider } from '@material-ui/core';
import PerfilMotorista from '../../components/perfil/motorista';
import FirstTime from './FirstTime'

const DefaultPage = props => (
	<Fragment>
		<DadosPessoais />
		<Divider />
		<PerfilMotorista />
	</Fragment>
)

class Perfil extends Component {
	constructor(props) {
		super(props);  
	}

	render() {
		const { fistTimeEditingProfile = true } = this.props
		return ( 
			fistTimeEditingProfile ? <FirstTime /> : <DefaultPage />
		)
	}
}

export default Perfil
