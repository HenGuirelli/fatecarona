import React, { Component } from 'react'
import logo from './logo.ico'
import SideMenu from '../SideMenu'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {

  bindDrawer = f => {
    this.openDrawer = f;
  };

  render() {
    const { menuItems } = this.props
    let item = menuItems.find(item => item.selected)

    return(
      <nav className="navbar navbar-expand-lg navbar-dark ftc" style={{position: 'fixed', width: '100%', height: '58px', top: 0, left: 0, zIndex: 100, boxShadow: 'rgba(0, 0, 0, 0.54) 0px 2px 2px 0px'}}>
        <SideMenu callback={this.bindDrawer} handler={this.handleMenuSelect} menuItems={menuItems}/>
        <button style={{position: 'absolute', left: 0, border: 'none'}} className="navbar-toggler" type="button" onClick={() => this.openDrawer()}>
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="navbar-toggler" style={{color: '#fff', border: 'none', width: '100%', textAlign: 'center'}}>
            {item ? item.text : ''}
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="navbar-brand" to="/">
            <img className="App-logo" src={logo} width="30" height="30" alt=""/>{' '}Fatecarona
          </Link>
          <ul className="navbar-nav mr-auto">
            {menuItems.map(item => {
                if (item.menu) {
                  return <li className="nav-item" key={item.path} style={{fontSize: '15px'}}>
                    <Link className="nav-link" to={item.path}>{item.text}</Link>
                  </li>
                }
                return null
              }
            )}
          </ul>
        </div>
      </nav>
    );
  }
}
