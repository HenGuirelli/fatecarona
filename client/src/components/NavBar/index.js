import React, { Component } from 'react'
import logo from './logo.ico'
import SideMenu from '../SideMenu'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUserData } from '../../actions/userActions'
import menuItems from '../SideMenu/menuItems'

class NavBar extends Component {

  bindDrawer = f => {
    this.openDrawer = f;
  };

  render() {
    const { user, userData } = this.props

    if (user.email !== undefined && userData.nome === undefined) {
      this.props.dispatch(setUserData(this.props.user.email.split('@')[0]));
    }

    return(
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark ftc">
        <SideMenu callback={this.bindDrawer} handler={this.handleMenuSelect} />
        <div className="navbar-toggler" style={{color: '#fff', border: 'none', margin: '0 auto'}}>
            {menuItems.find(item => item.selected).text}
        </div>
        <button className="navbar-toggler" type="button" onClick={() => this.openDrawer()}>
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="navbar-brand" to="/">
            <img className="App-logo" src={logo} width="30" height="30" alt=""/>{' '}Fatecarona
          </Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/perfil">Editar perfil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/caronas/request">Quero carona</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/caronas/offer">Oferecer carona</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rotas">Rotas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/caronas/historico">Minhas caronas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/veiculos">Meus veículos</Link>
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
