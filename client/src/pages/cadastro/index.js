import React, { Component } from 'react'
import { connect } from 'react-redux'
import { insertUser } from '../../actions/userActions'
import logo from '../../pages/form/login_fatecarona.svg'
import MaskedInput from 'react-maskedinput'
import config from '../../config.json'
import axios from 'axios'

class Cadastro extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      senha: '',
      nome: '',
      cel: '',
      ra: ''
    }
  }

  handleEmail = (event) => {
    this.setState({email: event.target.value.toLowerCase()})
  };

  handlePassword = (event) => {
    this.setState({senha: event.target.value})
  };

  handleNome = (event) => {
    this.setState({nome: event.target.value})
  };

  handleCel = (event) => {
    this.setState({cel: event.target.value})
  };

  handleRA = (event) => {
    if (event.target.value.length > 13) return
    this.setState({ra: event.target.value})
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const { email, senha, nome, cel, ra } = this.state
    if(email.length === 0 || senha.length === 0 || nome.length === 0 || cel.length === 0 || ra.length === 0) {
      window.displayDialog({msg: "Favor Preencher todos os campos!"})
      return
    }
    if (!email.match('@fatec.sp.gov.br')) {
      window.displayDialog({msg: 'Utilize um email institucional! ex:"aluno.sobrenome@fatec.sp.gov.br"'})
      return
    }
    if (!/[0-9]{5}-[0-9]{4}/.test(cel)) {
      window.displayDialog({msg: 'Numero com formato inválido. ex:"99999-9999"'})
      return
    }	
    this.props.firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then(a => {
      this.props.dispatch(insertUser({
        ra,
        nome,
        telefone: cel,
        email: email.split('@')[0]
      }))
	})
    .catch((error) => {
      window.displayDialog({title: 'Erro', msg: error.message})
    })
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
        marginTop: '-58px',
        backgroundColor: '#6E4D8B',
        marginBottom: '-5000px',
        paddingBottom: '5000px',
        overflow: 'hidden'
      }
    }

    //const { firebase } = this.props
    return (
      <div style={styles.root}>
        <img src={logo} alt="" className="img-fluid mx-auto d-block"/>
        <div className="container">
          <form onSubmit={this.handleSubmit} className="form-group">
              <input
                placeholder='RA'
                type="number"
                min="0"
                style={styles.inputText}
                value={this.state.ra}
                onChange={this.handleRA}
                className="form-control"
              />
              <input
                placeholder='E-mail Institucional ex: "aluno.sobrenome@fatec.sp.gov.br"'
                style={styles.inputText}
                value={this.state.email}
                onChange={this.handleEmail}
                className="form-control"
              />
              <input
                placeholder="Nome"
                style={styles.inputText}
                value={this.state.nome}
                onChange={this.handleNome}
                className="form-control"
              />
              <input
                placeholder="Senha"
                style={styles.inputText}
                value={this.state.senha}
                onChange={this.handlePassword}
                type="password"
                className="form-control"
              />
              <MaskedInput
                placeholder="Nº Celular"
                mask='(11) 11111-1111'
                style={styles.inputText}
                value={this.state.cel}
                onChange={this.handleCel}
                className="form-control"
              />
            <input
              type="submit"
              className="btn btn-primary btn-block loginBtn"
              style={styles.button} value="Cadastrar" />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(store => {
  return {
    firebase: store.user.firebase,
  }
})(Cadastro)
