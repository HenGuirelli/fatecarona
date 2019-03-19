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
		// TODO: PELOAMORDEDEUS tirar o timeout
		setTimeout(this.searchCarpools, 3000)		
	}

	searchCarpools = () => {
		const { date, email, hour } = this.props
		Carpool.searchRequestCarpools({ date, email, hour })
		.then(resolve => {
			this.setState({ carpools: resolve.data.matches, loading: false })
		})
		.catch(err => {
			// TODO: mensagem de erro
			this.setState({ loading: false })
		})
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
