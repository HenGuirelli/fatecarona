import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Caronas from '../../components/Notificacao/Caronas'
import Mensagens from '../../components/Notificacao/Mensagens'
import NOTIFICATION_TYPE from '../../components/Notificacao/notificationType'

const notificationTestJson = [
	{
		title: 'Notificação 1',
		text: 'coé..',
		type: 'CHAT',
		liftId: 1,
		new: false
	},
	{
		title: 'Notificação 2',
		text: 'suave?',
		type: 'CHAT',
		liftId: 0,
		new: false
	},
	{
		title: 'Notificação lift',
		text: 'Pessoa 1 quer pegar carona contigo',
		type: 'LIFT_MESSAGE_REQUEST',
		liftId: 3,
		new: false
	},
	{
		title: 'Notificação lift',
		text: 'Pessoa 2 aceitou sua carona',
		type: 'LIFT_MESSAGE',
		liftId: 3,
		new: false
	}
]

class Notifications extends Component {
	state = {
		value: 0
	}

	handleChange = (event, value) => {
		this.setState({ value })
	}
	
	getTabsContent = (value) => [
		<Caronas data={notificationTestJson.filter(item => 
			item.type === NOTIFICATION_TYPE.LIFT_MESSAGE_REQUEST || item.type === NOTIFICATION_TYPE.LIFT_MESSAGE)} />, 

		<Mensagens data={notificationTestJson.filter(item => item.type === NOTIFICATION_TYPE.CHAT)} />
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

export default Notifications
