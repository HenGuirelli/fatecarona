import React, { Component } from 'react'

export default class Verify extends Component {

  sendValidationEmail = () => {
    this.props.firebase.auth().currentUser.sendEmailVerification().then(function() {
      window.displayDialog({msg: "E-Mail de verificação enviado com sucesso!"})
    }).catch(function(error) {
      window.displayDialog({msg: "Erro ao enviar E-Mail de verificação: " + error.message})
    });
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
            value="Enviar E-mail de Verificação"
            style={styles.button}
            onClick={this.sendValidationEmail}
          />
        </div>
      </div>
    )
  }
}
