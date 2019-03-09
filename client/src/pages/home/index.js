import React, { Component } from 'react'
import Caronista from '../../components/Home/Caronista'
import Motorista from '../../components/Home/Motorista'
import Header from '../../components/Home/Header'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { connect } from 'react-redux'

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      perfil: 'caronista',
      value: 0
    }
  }

  handleClick(perfil) {
    this.setState({
      perfil: perfil
    })
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { value } = this.state
	return (
		<main className='home'>
			<Header> Rick </Header>
			<AppBar position="static" color="default">
			<Tabs value={value} onChange={this.handleChange} variant="fullWidth" indicatorColor='primary'>
				<Tab label="Caronista" />
				<Tab label="Motorista" />
			</Tabs>
			</AppBar>
			{ value === 0 ? <Caronista /> : <Motorista /> }
		</main>
	)
  }
}


export default connect(store => {
  return {
    email: store.user.email
  }
})(Home)