import React, { Component } from 'react'
import FirstTime from './FirstTime'
import DefaultPage from './DefaultPage'

class Perfil extends Component {
	constructor(props) {
		super(props)  
	}

	render() {
		const { fistTimeEditingProfile = true } = this.props
		return ( 
			fistTimeEditingProfile ? <FirstTime /> : <DefaultPage />
		)
	}
}

export default Perfil
