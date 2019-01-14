import React, { Component } from 'react'
import logo from './login_fatecarona.svg'
import { connect } from 'react-redux'
import { logIn } from '../../actions/userActions'
import popUp, { TIPO } from '../../components/PopUp'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmail = (event) => {
    this.setState({email: event.target.value.toLowerCase()})
  };

  handlePassword = (event) => {
    this.setState({password: event.target.value})
  };

  abrirCadastro = () => {
    this.props.history.push('/cadastro')
  };

  abrirRecuperar = () => {
    this.props.history.push('/recuperarsenha')
  };

  handleSubmit = (event) => {
    event.preventDefault()
      if(this.state.email.length === 0 || this.state.password.length === 0) {
        popUp({tipo: TIPO.ERRO, text: 'Favor inserir email e senha'})
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

  componentDidMount() {
    if (this.props.error) popUp({tipo: TIPO.ERRO, text: 'Usuário e/ou senha inválidos!'})
  }

  render() {
    const styles = {
      button: {
        margin: '5px 0',
        borderRadius: '25px',
        backgroundColor: 'transparent',
        borderColor: '#a8cf45',
        color: '#a8cf45',
        fontSize: '25px',
      },
      buttonRecuperar: {
        margin: '5px 0',
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
        marginTop: '-58px',
        paddingTop: '5em',
        backgroundColor: '#6E4D8B',
        marginBottom: '-5000px',
        paddingBottom: '5000px',
        overflow: 'hidden'
      }
    }

    //const { initState, firebase, user } = this.props
    return (
      <div style={styles.root}>
        <img src={logo} alt="" className="img-fluid mx-auto d-block"/>
        <div className="container">
          <form onSubmit={this.handleSubmit} className="">
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
            <input
              type="submit"
              className="btn btn-block loginBtn"
              style={styles.button}
              value="Entrar"
            />

          </form>
            <input
                type="button"
                className="btn btn-block loginBtn"
                style={styles.button}
                value="Cadastrar"
                onClick={this.abrirCadastro}
            />
            <input
                type="button"
                className="btn btn-block loginBtn"
                style={styles.buttonRecuperar}
                value="Esqueci a senha"
                onClick={this.abrirRecuperar}
            />
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
    error: store.user.error,
  }
})(LoginForm)
