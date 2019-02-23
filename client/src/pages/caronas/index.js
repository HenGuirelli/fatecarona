import React, { Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

class Caronas extends React.Component {
	state = {
		value: 0
	}

	constructor(props){
		super(props);   
	}

	handleChange = (event, value) => {
		this.setState({ value })
	}

	render() {
		const { value } = this.state
		return (
			<Fragment>
				<AppBar position="static" color='default'>
					<Tabs value={value} onChange={this.handleChange} variant="fullWidth" indicatorColor='primary'>
						<Tab label="Andamento" />
						<Tab label="Histórico" />
						<Tab label="Pendente" />
					</Tabs>
				</AppBar>
				{ value }
			</Fragment>
		)
	}
}

export default Caronas
