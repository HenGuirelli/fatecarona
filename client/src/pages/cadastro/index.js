import React, { Component, Fragment } from 'react'
import { insertUser } from '../../actions/userActions'
import './style.css'
import popUp, { TIPO } from '../../components/PopUp'

import Typography from '@material-ui/core/Typography';
import { OutlinedTextField } from '../../components/Form/TextField'
import ContainedButton from '../../components/Form/Button'
import CadastroHttp from '../../http/Cadastro'

class Cadastro extends Component {
	constructor(props){
		super(props)

		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			name: ''
		}
	}

	handleSubmit = (event) => {
		event.preventDefault()
		const { email, password, name, confirmPassword } = this.state
	
		if (!email.match('@fatec.sp.gov.br')) {
			popUp({tipo: TIPO.ERRO, text: 'Utilize um email institucional! ex:"aluno.sobrenome@fatec.sp.gov.br"'})
			return
		}
		if (confirmPassword !== password){
			popUp({tipo: TIPO.ERRO, text: 'As senhas não coincidem'})
			return
		}

		CadastroHttp.createNewUser({ email, name })
		.then(result => {
			if (!result.data.success){
				popUp({ tipo: TIPO.ERRO, text: result.data.message })
			}else{
				window.location.href='/login'
			}
		})
		// this.props.firebase.auth().createUserWithEmailAndPassword(email, password)
		// .then(a => {
		// 	this.props.dispatch(insertUser({
		// 		ra,
		// 		name,
		// 		telefone: cel,
		// 		email: email.split('@')[0]
		// 	}))
		// })
		// .catch((error) => {
		// 	popUp({tipo: TIPO.ERRO, title: 'Erro', text: error.message})
		// })
	}

	handleChange = (name, value) => {
		this.setState({ [name]: value })
	}

	validateEmail = () => {
		const { email } = this.state
		if (!email.includes('@')){
			console.log(email)
			this.setState({ email: email + '@fatec.sp.gov.br' })
		}
	}

	render() {
		const { value } = this.state
		return (
			<main className="cadastro">
				<Typography component='div' align='center'>
					<OutlinedTextField label="Email Instituicional" className='component' block
						onChange={(event) => this.handleChange('email', event.target.value)} 
						value={this.state.email}
						onBlur={ this.validateEmail }/>
					<OutlinedTextField label="Nome" className='component' block
						onChange={(event) => this.handleChange('name', event.target.value)} />
					<OutlinedTextField label="Senha" className='component' type="password" block
						onChange={(event) => this.handleChange('password', event.target.value)} />
					<OutlinedTextField label="Confirmar senha" className='component' type="password" block
						onChange={(event) => this.handleChange('confirmPassword', event.target.value)} />

					<ContainedButton color="primary" className="component button" onClick={ this.handleSubmit }>Cadastrar</ContainedButton>
				</Typography>
			</main>
		)
  	}
}

export default Cadastro
