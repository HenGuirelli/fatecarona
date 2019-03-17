import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Caronas from '../../components/Notificacao/Caronas'
import Mensagens from '../../components/Notificacao/Mensagens'
import NOTIFICATION_TYPE from '../../components/Notificacao/notificationType'
import Notification from '../../http/Notification'
import { connect } from 'react-redux'

class Notifications extends Component {
	state = {
		value: 0,
		notifications: []
	}

	componentDidMount(){
		// TODO: loading enquanto não carrega
		const { email } = this.props
		Notification.getNotifications({ email })
		.then(resolve => {
			const result = resolve.data
			const { notifications } = result
			this.setState({ notifications })
		})
		.catch(err => { /** TODO: mensagem de erro */ })
	}

	handleChange = (event, value) => {
		this.setState({ value })
	}
	
	getTabsContent = (value) => [
		<Caronas data={this.state.notifications.filter(item => 
			item.type === NOTIFICATION_TYPE.CARPOOL_REQUEST || item.type === NOTIFICATION_TYPE.CARPOOL_REQUEST)} />, 

		<Mensagens data={this.state.notifications.filter(item => item.type === NOTIFICATION_TYPE.MESSAGE)} />
	][value]

	render() {
		const { value } = this.state
			
		return (
			<Fragment>
				<AppBar position="static">
					<Tabs value={value} onChange={this.handleChange} variant="fullWidth" indicatorColor='secondary'>
						<Tab label="Caronas" />
						<Tab label="Mensagens" />
					</Tabs>
				</AppBar>
				{ this.getTabsContent(value)  }
			</Fragment>
		)
	}
}

export default connect(store => {
	return {
		email: store.user.email
	}
})(Notifications)
