import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const NOTIFICATION_TYPE = {
	CHAT: 'CHAT',
	LIFT_MESSAGE: 'LIFT_MESSAGE'
}

const notificationTestJson = [
	{
		title: 'Notificação 1',
		type: 'CHAT',
		liftId: 1
	},
	{
		title: 'Notificação 2',
		type: 'CHAT',
		liftId: 0
	},
	{
		title: 'Notificação lift',
		type: 'LIFT_MESSAGE',
		liftId: 3
	}
]

class Notifications extends Component {
	state = {
		value: 0
	}

	handleChange = (event, value) => {
		this.setState({ value })
	}

	render() {
		const { value } = this.state
			
		return (
			<Fragment>
				<AppBar position="static" color="primary">
				<Tabs value={value} onChange={this.handleChange} variant="fullWidth" indicatorColor='secondary'>
					<Tab label="Aluno" />
					<Tab label="Funcionário" />
				</Tabs>
				</AppBar>
			</Fragment>
		)
	}
}

export default Notifications
