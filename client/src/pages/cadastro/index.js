import React, { Component, Fragment } from 'react'
import { insertUser } from '../../actions/userActions'
import './style.css'
import popUp, { TIPO } from '../../components/PopUp'

import Typography from '@material-ui/core/Typography';
import { OutlinedTextField } from '../../components/Form/TextField'
import ContainedButton from '../../components/Form/Button'
import CadastroHttp from '../../http/Cadastro'
import TermoDeUso from '../termoDeUso';

class Cadastro extends Component {
	constructor(props){
		super(props)

		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			showTermoDeUso: false
		}
	}

	handleSubmit = (event) => {
		event.preventDefault()
		const { email, password } = this.state

		this.verificarCamposVazios()
		this.verificarSenhaCoincide()
		this.verificarEmailInstitucional()

		CadastroHttp.createNewUser({ email, senha: password })
		.then(result => {
			if (result.data.sucesso){
				popUp({ tipo: TIPO.SUCESSO, text: "Conta criada com sucesso" })
			}
			setTimeout(() => {
				window.location.href='/login'				
			}, 3000);
		})
	}

	verificarCamposVazios = () => {
		const { email, password, confirmPassword } = this.state
		if (!email || !password || !confirmPassword){
			popUp({ tipo: TIPO.ERRO, text: "Preencha todos os campos!" })
			throw "Campos vazios"
		}
	}
	
	verificarSenhaCoincide = () => {
		const { password, confirmPassword } = this.state
		if (password !== confirmPassword){
			popUp({ tipo: TIPO.ERRO, text: "Senhas não coincidem" })
			throw "Senhas não coincidem"
		}
	}

	verificarEmailInstitucional = () => {
		const { email } = this.state
		if (!email.match('@fatec.sp.gov.br')) {
			popUp({tipo: TIPO.ERRO, text: 'Utilize um email institucional! ex:"aluno.sobrenome@fatec.sp.gov.br"'})
			throw "Email inválido"
		}
	}

	handleChange = (name, value) => {
		this.setState({ [name]: value })
	}

	render() {
		const { value, showTermoDeUso } = this.state
		if (showTermoDeUso) {
			return <TermoDeUso onClick={ (e) => this.handleSubmit(e) } /> 
		}
		return (
			<main className="cadastro">
				<Typography component='div' align='center'>
					<OutlinedTextField label="Email Instituicional" className='component' block
						onChange={(event) => this.handleChange('email', event.target.value)} 
						value={this.state.email}
						onBlur={ this.validateEmail }/>
					<OutlinedTextField label="Senha" className='component' type="password" block
						onChange={(event) => this.handleChange('password', event.target.value)} />
					<OutlinedTextField label="Confirmar senha" className='component' type="password" block
						onChange={(event) => this.handleChange('confirmPassword', event.target.value)} />

					<ContainedButton color="primary" className="component button" onClick={ () => this.setState({ showTermoDeUso: true }) }>Cadastrar</ContainedButton>
				</Typography>
			</main>
		)
  	}
}

export default Cadastro
