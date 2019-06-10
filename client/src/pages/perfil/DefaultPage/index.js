import React, { Fragment } from 'react'
import DadosPessoais from '../../../components/perfil/DadosPessoais'
import { Divider, Typography } from '@material-ui/core'
import PerfilMotorista from '../../../components/perfil/motorista'
import Button from '../../../components/Form/Button'
import ProfileHttp from '../../../http/Profile'
import PopUp, { TIPO } from '../../../components/PopUp'
import './style.css'
import { connect } from 'react-redux'

import { setUserData, setDriverProfile } from '../../../actions/userActions'
import { withRouter } from "react-router-dom"

class DefaultPage extends React.Component {
	state = {
		email: '',
		CNH: '',
		typeCNH: '',
		expirationDate: '',
		isDriver: false,
		nick: '',
		inFatec: '',
		outFatec: '',
		phone: ''
	}

	componentDidMount(){
		ProfileHttp.getProfileData({  email: this.props.email  })
		.then(resolve => {
			const result = resolve.data
			this.props.dispatch(setUserData({ ...result }))
			this.props.dispatch(setDriverProfile({ ...result }))

			console.log('consulta feita, atualizando state -- default page')
			this.setState({ ...result })
		})
	}

	handleClick = event => {
		this.save()
	}

	save = () => {
		const {
			email,
			CNH,
			typeCNH,
			expirationDate,
			isDriver,
			nick,
			inFatec,
			outFatec,
			phone
		} = this.props
		ProfileHttp.saveProfile({email, nick, inFatec, outFatec, phone, isDriver, CNH, typeCNH, expirationDate })
		.then(result => {
			PopUp({ tipo: TIPO.SUCESSO, text: 'Perfil atualizado' })
			.then(_ => {
				this.props.history.push('/')
			})
		})
	}

	render(){
		return (
			<Fragment>
				<Typography component='h3' variant='h6' align='center'>
					Dados Pessoais
				</Typography>
				<DadosPessoais { ...this.state } />
				<Divider />
				
				<Typography component='h3' variant='h6' align='center'>
					Dados de Motorista
				</Typography>
				<PerfilMotorista { ...this.state } />

				<Divider />
				<Typography component='div' align='center' className='defaul-page-btn-adicionar-wrapper'>
					<Button className='defaul-page-btn-adicionar' onClick={ this.handleClick }> Salvar </Button>
				</Typography>
			</Fragment>
		)
	}
}

export default withRouter(connect(store => {
	return{
		email: store.user.email,
		CNH: store.user.CNH,
        typeCNH: store.user.typeCNH,
        expirationDate: store.user.expirationDate,
		isDriver: store.user.isDriver,
		nick: store.user.nick,
        inFatec: store.user.inFatec,
        outFatec: store.user.outFatec,
        phone: store.user.phone
	}
})(DefaultPage))