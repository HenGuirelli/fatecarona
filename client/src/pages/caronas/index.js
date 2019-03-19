import React, { Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Gerenciar, { status, side } from '../../components/Carona/Gerenciar'
import { Paper } from '@material-ui/core'
import CarpoolHttp from '../../http/Carpool'
import { connect } from 'react-redux'

class Caronas extends React.Component {
	state = {
		value: 0,
		carpools: []
	}

	constructor(props){
		super(props);   
	}

	componentDidMount(){
		this.searchCarpools()
	}

	searchCarpools = () => {
		const { email } = this.props
		CarpoolHttp.searchCarpool({ email })
		.then(resolve => {
			const result = resolve.data
			if (result.success){
				console.log('result carpools:', result)
				this.setState({ carpools: result.carpool })
			}else{
				// TODO: mensagem de erro
			}
		})
	}

	handleChange = (event, value) => {
		this.setState({ value })
	}

	getPage = value => [ 
		<div>
			{this.state.carpools.filter(item => item.status === status.ANDAMENTO)
				.map((carona, index) => 
					<Paper>
						<Gerenciar key={`carona-andamento-${index}`} {...carona} type={status.ANDAMENTO} />
					</Paper>
				)}
		</div>, 
		<div>
			{this.state.carpools.filter(item => item.status === status.REALIZADO).map((carona, index) =>
				<Paper>
					<Gerenciar key={`carona-realizado-${index}`}  { ...carona } type={status.REALIZADO} />
				</Paper>
			)}
		</div>,
		<div>
			{this.state.carpools.filter(item => item.status === status.PENDENTE).map((carona, index) =>
				<Paper>
					<Gerenciar key={`carona-pendente-${index}`} { ...carona }  type={status.PENDENTE} />
				</Paper>
			)}
		</div>][value]

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
				{ this.getPage(value) }
			</Fragment>
		)
	}
}

export default connect(store => {
	return {
		email: store.user.email
	}
})(Caronas)
