import React, { Component } from 'react'
import logo from './login_fatecarona.svg'
import { logIn } from '../../actions/userActions'
import popUp, { TIPO } from '../../components/PopUp'
import TextFieldOutlined from '../../components/Form/TextField'
import { Typography } from '@material-ui/core'
import './style.css'
import ContainedButton from '../../components/Form/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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
  
  handlePasswrod = event => {
    console.log(event.target.value)
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
						<TextFieldOutlined label="Email" className="component"/>
						<br />
						<TextFieldOutlined label="Senha" type="password" onChange={this.handlePasswrod} className="component" />
						<br />
					</CardContent>
					<CardContent>
						<ContainedButton color="primary" className="component button" onClick={() => console.log('button clicked')}>Logar</ContainedButton>
						<br />
						<ContainedButton color="primary" className="component button" onClick={() => console.log('button clicked')}>Cadastrar</ContainedButton>
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
