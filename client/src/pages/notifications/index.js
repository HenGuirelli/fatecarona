import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Caronas from '../../components/Notificacao/Caronas';
import Mensagens from '../../components/Notificacao/Mensagens';

const NOTIFICATION_TYPE = {
	CHAT: 'CHAT',
	LIFT_MESSAGE: 'LIFT_MESSAGE'
}

const notificationTestJson = [
	{
		title: 'Notificação 1',
		type: 'CHAT',
		liftId: 1,
		new: false
	},
	{
		title: 'Notificação 2',
		type: 'CHAT',
		liftId: 0,
		new: false
	},
	{
		title: 'Notificação lift',
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
		<Caronas data={notificationTestJson.filter(item => item.type === NOTIFICATION_TYPE.LIFT_MESSAGE)} />, 
		<Mensagens data={notificationTestJson.filter(item => item.type === NOTIFICATION_TYPE.CHAT)} />
	][value]

	render() {
		const { value } = this.state
			
		return (
			<Fragment>
				<AppBar position="static" color="primary">
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
