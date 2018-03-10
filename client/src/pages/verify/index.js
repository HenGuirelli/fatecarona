import React, { Component } from 'react'
import Modal from '../../components/Modal'

export default class Verify extends Component {
  
  sendValidationEmail = () => {
    const showModal = this.showModal
    this.props.firebase.auth().currentUser.sendEmailVerification().then(function() {
      showModal("E-Mail de verificação enviado com sucesso!")
    }).catch(function(error) {
      showModal("Erro ao enviar E-Mail de verificação: " + error.message)
    });
  }

  storeFunc = f => {
    this.showModal = f
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
        <Modal title={"Verificação de E-Mail"} callBack={this.storeFunc} logOut={this.props.logOut}/>
        <div className="container" style={styles.root}>
          <h1>Email não verificado!</h1>
          <input 
            type="button" 
            className="btn btn-block loginBtn" 
            value="ENVIAR E-MAIL DE VERIFICAÇÃO"
            style={styles.button}
            onClick={this.sendValidationEmail}
          />
        </div>
      </div>
    )
  }
}