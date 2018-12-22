import React, { Component } from 'react'
import { connect } from 'react-redux'
import { insertUser } from '../../actions/userActions'
import logo from '../../pages/form/login_fatecarona.svg'
import Input from '../../components/Form/Input'
import './style.css'

class Cadastro extends Component {
  constructor(props){
	  super(props)

	  this.state = {
		email: '',
		password: '',
		name: '',
		ra: '',
		cel: '',
		confirmPassword: ''
	  }
  }

  handleSubmit = (event) => {
    event.preventDefault()
	const { email, password, name, cel, ra, confirmPassword } = this.state
   
    if (!email.match('@fatec.sp.gov.br')) {
      window.displayDialog({msg: 'Utilize um email institucional! ex:"aluno.sobrenome@fatec.sp.gov.br"'})
      return
    }
    if (!/[0-9]{5}-[0-9]{4}/.test(cel)) {
      window.displayDialog({msg: 'Numero com formato inválido. ex:"99999-9999"'})
      return
	}
	if (confirmPassword !== password){
		window.displayDialog({msg: 'As senhas não coincidem'})
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
      window.displayDialog({title: 'Erro', msg: error.message})
    })
  }

 
  render() {
    const styles = {
      root: {
        paddingTop: '5em',
        marginTop: '-58px',
        backgroundColor: '#6E4D8B',
        marginBottom: '-5000px',
        paddingBottom: '5000px',
        overflow: 'hidden'
	  },
	  button: {
        margin: '25px 0',
        borderRadius: '25px',
        backgroundColor: 'transparent',
        borderColor: '#a8cf45',
        color: '#a8cf45',
        fontSize: '25px',
      },
    }

    //const { firebase } = this.props
    return (
      <div style={styles.root}>
        <img src={logo} alt="" className="img-fluid mx-auto d-block"/>
        <div className="container">
        	<form onSubmit={this.handleSubmit} className="form-group">
				<div className='wrapper-input'>
					<Input required label='RA' type='number' name='ra' 
						onChangeCallback={(value) => this.setState({ ra: value })} />
				</div>
				<div className='wrapper-input'>
					<Input required 
						label='E-mail Institucional'
						placeholder='ex: "aluno.sobrenome@fatec.sp.gov.br"'
						onChangeCallback={(value) => this.setState({ email: value })}
					/>
				</div>
				<div className='wrapper-input'>
					<Input required label="Nome" onChangeCallback={(value) => this.setState({ name: value })}/>
				</div>
				<div className='wrapper-input'>
					<Input required type='password' label="Senha" onChangeCallback={(value) => this.setState({ password: value })}/>
				</div>
				<div className='wrapper-input'>
					<Input required type='password' label='Confirmar senha' onChangeCallback={(value) => this.setState({ confirmPassword: value })}/>
				</div>
				<div className='wrapper-input'>
					<Input required label="Nº Celular" onChangeCallback={(value) => this.setState({ cel: value })}/>
				</div>

				<input
					type="submit"
					className="btn btn-primary btn-block loginBtn"
					style={styles.button} value="Cadastrar" 
				/>
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
