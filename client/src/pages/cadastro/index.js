import React, { Component, Fragment } from 'react'
import { insertUser } from '../../actions/userActions'
import './style.css'
import popUp, { TIPO } from '../../components/PopUp'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { OutlinedTextField } from '../../components/Form/TextField'
import ContainedButton from '../../components/Form/Button'

class Cadastro extends Component {
	constructor(props){
		super(props)

		this.state = {
		email: '',
		password: '',
		name: '',
		ra: '',
		cel: '',
		confirmPassword: '',
		value: 0
		}
	}

	handleSubmit = (event) => {
		event.preventDefault()
		const { email, password, name, cel, ra, confirmPassword } = this.state
	
		if (!email.match('@fatec.sp.gov.br')) {
		popUp({tipo: TIPO.ERRO, text: 'Utilize um email institucional! ex:"aluno.sobrenome@fatec.sp.gov.br"'})
		return
		}
		if (!/[0-9]{5}-[0-9]{4}/.test(cel)) {
		popUp({tipo: TIPO.ERRO, text: 'Numero com formato inválido. ex:"99999-9999"'})
		return
		}
		if (confirmPassword !== password){
			popUp({tipo: TIPO.ERRO, text: 'As senhas não coincidem'})
			return
		}
		this.props.firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(a => {
			this.props.dispatch(insertUser({
				ra,
				name,
				telefone: cel,
				email: email.split('@')[0]
			}))
		})
		.catch((error) => {
			popUp({tipo: TIPO.ERRO, title: 'Erro', text: error.message})
		})
	}

	handleChange = (event, value) => {
		this.setState({ value })
	}	

  render() {
    const { value } = this.state
    return (
		<main className="cadastro">
			<Typography component='div' align='center'>
				<OutlinedTextField label="Email Instituicional" className='component' block />
				<OutlinedTextField label="Nome" className='component' block />      
				<OutlinedTextField label="Senha" className='component' block />
				<OutlinedTextField label="Confirmar senha" className='component' block />

				<ContainedButton color="primary" className="component button" onClick={() => console.log('button clicked')}>Cadastrar</ContainedButton>
			</Typography>
		</main>
    );
  }
}

export default Cadastro
