import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../../pages/login/login_fatecarona.svg'
import popUp, { TIPO } from '../../components/PopUp'

class Recuperar extends Component {
  constructor() {
    super()
    this.state = {
      email: ''
    }
  }

  handleEmail = (event) => {
    this.setState({email: event.target.value.toLowerCase()})
  };

  recuperarEmail = (e) => {
    e.preventDefault()
    let email = this.state.email
    if (!email) {
      popUp({tipo: TIPO.ERRO, text: 'Favor inserir um email.'})
      return
    }
    if (!email.match('@fatec.sp.gov.br')) {
      email = email + '@fatec.sp.gov.br'
    }
    this.props.firebase.auth().sendPasswordResetEmail(email).then(function() {
      popUp({tipo: TIPO.SUCESSO, 
        title: 'E-mail enviado',
        text: 'E-mail de recuperação enviado. Continue a operação verificando sua caixa de mensagens'
      }, '/')
    }).catch(function(error) {
      popUp({tipo: TIPO.ERRO, 
        title: 'E-mail incorreto',
        text: 'Digite um e-mail cadastrado em nosso sistema'
      })
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
      text: {
        margin: '25px 0',
        marginLeft: '35%',
        color:'#a8cf45',
        fontWeight: 'normal'
      },
      root: {
        paddingTop: '5em',
        backgroundColor: '#6E4D8B',
        marginTop: '-59px',
        marginBottom: '-5000px',
        paddingBottom: '5000px',
        overflow: 'hidden'
      }
    }



    return (
      <div style={styles.root}>
        <img src={logo} alt="" className="img-fluid mx-auto d-block"/>
        <h6 style={styles.text}>Esqueci a senha</h6>
        <div className="container">
          <form onSubmit={this.recuperarEmail} className="form-group">
              <input
                placeholder="E-mail"
                style={styles.inputText}
                value={this.state.email}
                onChange={this.handleEmail}
                className="form-control"
              />
            <input
              type="submit"
              className="btn btn-block loginBtn"
              style={styles.button}
              value="Enviar confirmação"
            />
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
    error: store.user.error,
  }
})(Recuperar)
