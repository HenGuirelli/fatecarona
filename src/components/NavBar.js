import React, { Component } from 'react';
import logo from './logo.ico';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    return(
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          <img className="App-logo" src={logo} width="30" height="30" alt=""/>Fatecarona
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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