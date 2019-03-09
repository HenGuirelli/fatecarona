import React, { Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Gerenciar, { status, side } from '../../components/Carona/Gerenciar'
import { Paper } from '@material-ui/core'

const andamentosTest = [
	{
		carPoolId: 3,
		date: '23/02/2019',
		side: side.TO_FATEC,
		driver: 'nome motorista',
		rider: 'nome caronista',
		status: status.ANDAMENTO
	},
	{
		carPoolId: 3,
		date: '23/02/2019',
		side: side.OUT_FATEC,
		driver: 'nome motorista 2',
		rider: 'nome caronista 2',
		status: status.PENDENTE
	},
	{
		carPoolId: 3,
		date: '23/02/2019',
		side: side.OUT_FATEC,
		driver: 'nome motorista 2',
		rider: 'nome caronista 2',
		status: status.REALIZADO
	}
]

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

	getPage = value => [ 
		<div>
			{andamentosTest.filter(item => item.status === status.ANDAMENTO)
				.map((carona, index) => 
					<Paper>
						<Gerenciar key={`carona-andamento-${index}`} {...carona} type={status.ANDAMENTO} />
					</Paper>
				)}
		</div>, 
		<div>
			{andamentosTest.filter(item => item.status === status.REALIZADO).map((carona, index) =>
				<Paper>
					<Gerenciar key={`carona-realizado-${index}`}  { ...carona } type={status.REALIZADO} />
				</Paper>
			)}
		</div>,
		<div>
			{andamentosTest.filter(item => item.status === status.PENDENTE).map((carona, index) =>
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

export default Caronas
