import React, { Component } from 'react'
import { connect } from 'react-redux'
import InfoCarona from '../../components/InfoCarona'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
// TODO: import ListItemIcon from '@material-ui/core/ListItemIcon' ?
import ListItemText from '@material-ui/core/ListItemText'
import { Paper, Card, CardContent, LinearProgress } from '@material-ui/core';
import Carpool from '../../http/Carpool';

class ResultCaronas extends Component {
	state = {
		carpools: [],
		loading: true
	}

	componentDidMount(){
		this.searchCarpools()
	}

	searchCarpools = () => {
		const { date, email, hour } = this.props
		Carpool.searchRequestCarpools({ date, email, hour })
		.then(resolve => {
			this.translateAll(resolve)
		})
		.catch(err => {
			// TODO: mensagem de erro
			console.log('erro', err)
			this.setState({ loading: false })
		})
	}

	translate(carpool){
		return {
			id: carpool.id,
			email: carpool.email,
			car: { model: carpool.veiculo.modelo, brand: carpool.veiculo.marca, plate: carpool.veiculo.placa  }, 
			date: carpool.data,
			destination: carpool.destino,
			hour: carpool.hora
		}
	}

	translateAll(carpools){
		const newValue = carpools.map(this.translate)
		this.setState({ carpools: newValue, loading: false  })
	}

	render() {
		const carpools = this.state.carpools
		if (this.state.loading){ return <LinearProgress /> }
		return (
			<div className='result-caronas-page'>
				{ carpools.map((lift, key) => {
					return <Card className='card'> <CardContent> <InfoCarona key={key} carpool={lift} /> </CardContent> </Card> })}
			</div>
		)
	}
}

export default connect(store => {
	return {
		carpools: store.carpool.matches,
		date: store.carpool.date,
		hour: store.carpool.hour,
		email: store.user.email
	}
})(ResultCaronas)
