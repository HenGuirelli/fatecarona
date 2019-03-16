import React, { Fragment } from 'react'
import DadosPessoais from '../../../components/perfil/DadosPessoais'
import { Divider, Typography } from '@material-ui/core'
import PerfilMotorista from '../../../components/perfil/motorista'
import Button from '../../../components/Form/Button'
import ProfileHttp from '../../../http/Profile'
import './style.css'
import { connect } from 'react-redux'

import { setUserData, setDriverProfile } from '../../../actions/userActions'

class DefaultPage extends React.Component {

	componentDidMount(){
		ProfileHttp.getProfileData({  email: this.props.email  })
		.then(resolve => {
			const result = resolve.data
			console.log(result)
			this.props.dispatch(setUserData({ ...result }))
			this.props.dispatch(setDriverProfile({ ...result }))
		})
	}

	render(){
		return (
			<Fragment>
				<Typography component='h3' variant='h6' align='center'>
					Dados Pessoais
				</Typography>
				<DadosPessoais />
				<Divider />
				
				<Typography component='h3' variant='h6' align='center'>
					Dados de Motorista
				</Typography>
				<PerfilMotorista />

				<Divider />
				<Typography component='div' align='center' className='defaul-page-btn-adicionar-wrapper'>
					<Button className='defaul-page-btn-adicionar'> Salvar </Button>
				</Typography>
			</Fragment>
		)
	}
}

export default connect(store => {
	return{
		email: store.user.email
	}
})(DefaultPage)