import React, { Component } from 'react'
import logo from './login_fatecarona.svg'
import { logIn } from '../../actions/userActions'
import popUp, { TIPO } from '../../components/PopUp'
import { Typography } from '@material-ui/core'
import './style.css'
import ContainedButton from '../../components/Form/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { OutlinedTextField } from '../../components/Form/TextField'

import Login from '../../http/Login'

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

  abrirCadastro = () => {
    this.props.history.push('/cadastro')
  };

  abrirRecuperar = () => {
    this.props.history.push('/recuperarsenha')
  };

  handleSubmit = (event) => {
	event.preventDefault()
	const email = this.state.email.replace('@fatec.sp.gov.br', '')
	const password = this.state.password

	// valida email e senha preenchidos
	if(this.state.email.length === 0 || this.state.password.length === 0) {
        popUp({tipo: TIPO.ERRO, text: 'Favor inserir email e senha'})
        return
	}

	
	// TODO: logar pelo FIREBASE
	// const res = this.props.firebase.auth().signInWithEmailAndPassword(email, password)
	// console.log(res)

	// pega valores do perfil na base de dados
	Login.getUserData({ email })
	.then(resolve => console.log(resolve.data))
  }
  
  handlePasswrod = event => {
    this.setState({ password: event.target.value })
  }

  render() {
    return (
		<main className="login">
			<Typography component='div' align='center'>
				<Card className="card">
          			<Avatar className="avatar">
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Login
					</Typography>
					<CardContent>
						<OutlinedTextField label="Email" onChange={this.handleEmail} className="component" block/>
						<OutlinedTextField label="Senha" type="password" onChange={this.handlePasswrod} className="component" block/>
					</CardContent>
					<CardContent>
						<ContainedButton color="primary" className="component button" onClick={ this.handleSubmit }>Logar</ContainedButton>
						<br />
						<ContainedButton color="primary" className="component button" onClick={() => window.location.href='/cadastro' }>Cadastrar</ContainedButton>
						<br />
						<ContainedButton color="primary" variant="outlined" className="component button" onClick={() => console.log('button clicked')}>Esqueci minha senha</ContainedButton>
					</CardContent>
				</Card>
			</Typography>
		</main>
    );
  }
}

export default LoginForm
