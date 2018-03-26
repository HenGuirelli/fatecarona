import React, { Component } from 'react'
import logo from './login_fatecarona.svg'
import Cadastro from '../cadastro'
import Recuperar from '../recuperar'
import { connect } from 'react-redux'
import { logIn } from '../../actions/userActions'
import Dialog from 'material-ui/Dialog'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      isCadOpen: false,
      isRecOpen: false,
      dialog: false,
      msg: ''
    }
  }

  handleEmail = (event) => {
    this.setState({email: event.target.value.toLowerCase()})
  };

  handlePassword = (event) => {
    this.setState({password: event.target.value})
  };

  abrirCadastro = () => {
    this.setState({isCadOpen: true})
  };

  abrirRecuperar = () => {
    this.setState({isRecOpen: true})
  };

  displayDialog = (msg) => {
    this.setState({dialog: true, msg})
  }

  handleClose = () => {
    this.setState({dialog: false})
  }

  handleSubmit = (event) => {
    event.preventDefault()
      if(this.state.email.length === 0 || this.state.password.length === 0) {
        this.displayDialog('Favor inserir email e senha')
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
    if (this.props.error) this.displayDialog('Usuário e/ou senha inválidos!')
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
        paddingTop: '5em',
        backgroundColor: '#6E4D8B',
        marginBottom: '-5000px',
        paddingBottom: '5000px',
        overflow: 'hidden'
      }
    }

    if (this.state.isCadOpen) return <Cadastro />
    if (this.state.isRecOpen) return <Recuperar />

    //const { initState, firebase, user } = this.props
    return (
      <div style={styles.root}>
        <Dialog
          title="Erro:"
          actions={null}
          modal={false}
          open={this.state.dialog}
          onRequestClose={this.handleClose}
        >
        {this.state.msg}
        </Dialog>
        <img src={logo} alt="" className="img-fluid mx-auto d-block"/>
        <div className="container">
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
            <input
              type="submit"
              className="btn btn-block loginBtn"
              style={styles.button}
              value="Entrar"
            />

          </form>
          <div className="row">
            <div className="col-4">
              <input
                type="button"
                className="btn btn-block loginBtn"
                style={styles.buttonRecuperar}
                value="?"
                onClick={this.abrirRecuperar}
              />
            </div>
            <div className="col-8">
              <input
                type="button"
                className="btn btn-block loginBtn"
                style={styles.button}
                value="Cadastrar"
                onClick={this.abrirCadastro}
              />
            </div>
          </div>
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
