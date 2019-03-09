import React, { Component } from 'react'
import Caronista from './Caronista'
import Motorista from './Motorista'
import Header from './Header'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      perfil: 'caronista',
      value: 0
    };
  }

  handleClick(perfil) {
    this.setState({
      perfil: perfil
    })
  }

  handleChange = (event, value) => {
    this.setState( { value })
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
