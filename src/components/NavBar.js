import React, { Component } from 'react'
import logo from './logo.ico'
import SideMenu from './sideMenu.js'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUserData } from '../actions/userActions'

class NavBar extends Component {

  bindDrawer = f => {
    this.openDrawer = f;
  };

  componentWillMount() {
    this.props.dispatch(setUserData(this.props.user.email.split('@')[0]))
  }

  render() {
    const { userData } = this.props
    return(
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark ftc">
        <SideMenu callback={this.bindDrawer} handler={this.handleMenuSelect} userData={userData}/>
        <button className="navbar-toggler" type="button" onClick={() => this.openDrawer()}>
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="navbar-brand" to="/">
            <img className="App-logo" src={logo} width="30" height="30" alt=""/>{' '}Fatecarona
          </Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/rotas">Rotas</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="#">Action</Link>
                <Link className="dropdown-item" to="#">Another action</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="#">Something else here</Link>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link disabled" to="#">Disabled</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#" onClick={this.props.logOut}>LogOut</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(store => {
  return {
    user: store.user.user,
    userData: store.user.userData
  }
})(NavBar)