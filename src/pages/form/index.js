import React, { Component } from 'react'
import logo from './login_fatecarona.png'
import logoface from './login_facebook.png'
import logogoogle from './login_google.png'
import { connect } from 'react-redux'
import { logIn } from '../../actions/userActions'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {email: '', password: ''}
  }

  handleEmail = (event) => {
    this.setState({email: event.target.value.toLowerCase()})
  };

  handlePassword = (event) => {
    this.setState({password: event.target.value})
  };

  handleSubmit = (event) => {
    event.preventDefault()
      if(this.state.email.length === 0 || this.state.password.length === 0) {
        alert('Favor inserir email e senha')
        return
      }
      let email = this.state.email
      if (!email.match('@fatec.sp.gov.br')) {
        email = email + '@fatec.sp.gov.br'
      }
      this.props.dispatch(logIn(email, this.state.password, this.props.firebase))
  }

  componentWillMount() {
    this.props.history.push('/')
  }

  render() {
    const styles = {
      button: {
        margin: '25px 0',
        borderRadius: '25px',
        backgroundColor: 'transparent',
        borderColor: '#a8cf45',
        color: '#a8cf45',
        fontSize: '25px',
      },
      inputText: {
        margin: '25px 0',
        borderRadius: '25px',
      },
      root: {
        paddingTop: '5em',
      }
    }

    const { initState, firebase, user } = this.props
    return (
      <div style={styles.root} className="formLogin">
          <img src={logo} alt="" className="img-fluid mx-auto d-block"/>
          <div className="container col">
            <form onSubmit={this.handleSubmit} className="form-group">
                <input
                  placeholder="Usuário"
                  style={styles.inputText}
                  value={this.state.email}
                  onChange={this.handleEmail}
                  className="form-control"
                />
                <input
                  placeholder="Senha"
                  style={styles.inputText}
                  value={this.state.password}
                  onChange={this.handlePassword}
                  type="password"
                  className="form-control"
                />
              <button 
                type="submit" 
                className="btn btn-primary btn-block loginBtn" 
                style={styles.button}>ENTRAR</button>
              {/*<a><img src={logoface} alt="logo" className="bigImg"/></a>
              <br/>
              <a><img src={logogoogle} alt="logo" className="bigImg"/></a>*/}
            </form>
          </div>
      </div>
    );
  }
}

export default connect(store => {
  return {
    initState: store.user.initState, 
    firebase: store.user.firebase, 
    user: store.user.user,
  }
})(LoginForm)