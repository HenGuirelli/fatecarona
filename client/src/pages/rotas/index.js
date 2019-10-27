import React, { Component } from 'react'
import ListTrajetos from '../../components/Trajeto/ListTrajeto'
import Button from '../../components/Form/Button'
import './style.css'

import { Link } from 'react-router-dom'
import Flow from '../../http/Flow'
import { connect } from 'react-redux'

class Rotas extends Component{
	state = {
		trajetos: []
	}

	componentDidMount(){
		this.loadFlows()
	}

	loadFlows = () => {
		Flow.getFlows({ email: this.props.email })
		.then(resolve => {
			const result = resolve.data
			this.setState({ trajetos: result })
		})
	}

	render(){
		return(
			<div className='page-trajetos'>
				<ListTrajetos trajetos={this.state.trajetos} actionAfterClick={this.loadFlows} />

				<Link to='/rotas/adicionar'>
					<Button className='btn-adicionar'>Adicionar</Button>
				</Link>
			</div>
		)
	}
}

export default connect(store => {
	return {
		email: store.user.email
	}
})(Rotas)
