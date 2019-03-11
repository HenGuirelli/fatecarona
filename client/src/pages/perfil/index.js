import React, { Component } from 'react'
import FirstTime from './FirstTime'
import DefaultPage from './DefaultPage'
import ProfileHttp from '../../http/Profile'
import { connect } from 'react-redux'

class Perfil extends Component {
	state = {
		fistTimeEditingProfile: false
	}

	componentDidMount(){
		ProfileHttp.getProfileData({ email: this.props.email })
		.then(resolve => {
			const result = resolve.data
			console.log(result, result.inFatec, result.inFatec === undefined)
			this.setState({ fistTimeEditingProfile: result.inFatec === undefined })
		})
	}

	render() {
		const { fistTimeEditingProfile } = this.state
		console.log('render: ', fistTimeEditingProfile)
		return (
			fistTimeEditingProfile ? <FirstTime /> : <DefaultPage />
		)
	}
}

export default connect(store => {
	return {
		email: store.user.email
	}
})(Perfil)
