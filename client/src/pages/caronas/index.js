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
		CarpoolHttp.pesquisarCaronas(email)
		.then(resolve => {
			const result = resolve.data
			if (result.sucesso){
				this.setState({ carpools: result.resultado.reverse() })
			}else{
				// TODO: mensagem de erro
			}
		})
	}

	handleChange = (event, value) => {
		this.setState({ value })
	}

	render() {
		const carpool = this.state.carpools.map(carpool => {
			return {
				id: carpool.id,
				email: carpool.motorista,
				date: carpool.data,
				hour: carpool.hora,
				destination: carpool.destino,
				repeat: carpool.eh_semanal,
				weekdays: {
					segunda: carpool.segunda,
					terca: carpool.terca,
					quarta: carpool.quarta,
					quinta: carpool.quinta,
					sexta: carpool.sexta,
					sabado: carpool.sabado,
					domingo: carpool.domingo,
				}
			}
		})
		return (
			<Fragment>
				<div>
					{carpool.map((carona, index) => 
						<Paper>
							<Gerenciar key={`carona-andamento-${index}`} {...carona} />
						</Paper>
					)}
				</div>
			</Fragment>
		)
	}
}

export default connect(store => {
	return {
		email: store.user.email
	}
})(Caronas)
