import React, { Component, Fragment } from 'react'
import Caronista from '../../components/Home/Caronista'
import Motorista from '../../components/Home/Motorista'
import Header from '../../components/Home/Header'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { connect } from 'react-redux'
import ProfileHttp from '../../http/Profile'
import NotificationHttp from '../../http/Notification'

class Home extends Component {
	constructor(props){
		super(props)
		this.state = {
			isDriver: false,
			nick: '',
			name: '',
			inFatec: '',
			outFatec: '',
			value: 0
		}
		this.threadNotificacaoAtivada = false
	}


	verificarNotificacao(){
		const { email } = this.props.user
		if (email != null){
			NotificationHttp.getNotifications({ email })
			.then(resolve => {
				const { data } = resolve
				if (data && data.sucesso){
					// notificacao aqui
				}
			})
		}
	}

	iniciarThreadNotificacao(){
		if(!this.threadNotificacaoAtivada){
			setInterval(() => {
				this.verificarNotificacao()
			}, 5000);
			this.threadNotificacaoAtivada = true
		}
	}

	handleChange = (event, value) => {
		this.setState({ value })
	}

	componentDidMount(){
		ProfileHttp.getProfileData({ email: this.props.user.email })
		.then(resolve => {
			const result = resolve.data

			if (result.success){
				this.setState({ ...result })
			}
		})
		this.iniciarThreadNotificacao()
	}

	driverComponent(){
		const { value } = this.state
		return (
			<Fragment>
				<AppBar position="static" color="default">
					<Tabs value={value} onChange={this.handleChange} variant="fullWidth" indicatorColor='primary'>
						<Tab label="Caronista" />
						<Tab label="Motorista" />
					</Tabs>
				</AppBar>
				{ value === 0 ? <Caronista /> : <Motorista /> }
			</Fragment>
		)
	}

	render() {
		const { isDriver, nick, name, inFatec, outFatec } = this.state
		return (
			<main className='home'>
				<Header inFatec={inFatec} outFatec={outFatec} nick={nick || name}> { nick } </Header>
				{ isDriver ? this.driverComponent() : <Caronista /> }
			</main>
		)
	}
}


export default connect(store => {
  return {
    user: store.user
  }
})(Home)