import React, { Component } from 'react'
import popUp, { TIPO } from '../../components/PopUp'

export default class Verify extends Component {

  sendValidationEmail = () => {
    const user = this.props.firebase.auth().currentUser
    user.sendEmailVerification().then(
      popUp({tipo: TIPO.SUCESSO, text: "E-Mail de verificação enviado para " + user.email})
    ).catch(error =>
      popUp({tipo: TIPO.ERRO, text: "Erro ao enviar E-Mail de verificação: " + error.message})
    )
  }

  componentWillMount() {
    this.sendValidationEmail()
  }

  render() {
    const styles = {
      root: {
        marginTop: '10em',
        padding: '5em',
        color: '#fff',
        backgroundColor: '#6E4D8B',
        borderRadius: '1em',
      },
      button: {
        margin: '25px 0',
        borderRadius: '25px',
        backgroundColor: 'transparent',
        borderColor: '#a8cf45',
        color: '#a8cf45',
        fontSize: '25px',
      }
    }

    return(
      <div className="pageBase">
        <div className="container" style={styles.root}>
          <h1>Email não verificado!</h1>
          <input
            type="button"
            className="btn btn-block loginBtn"
            value="Re-enviar E-mail de Verificação"
            style={styles.button}
            onClick={this.sendValidationEmail}
          />
          <p>
            Tente recarregar a página após acessar o email enviado,
            caso esta mensagem continue aparecendo tente re-enviar o email de verificação
            pressionando o botão acima.
          </p>
        </div>
      </div>
    )
  }
}
