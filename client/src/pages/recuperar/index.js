import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../../pages/form/login_fatecarona.svg'
import Dialog from 'material-ui/Dialog'

class Recuperar extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      dialog: false,
      msgTitle: '',
      msg: ''
    }
  }

  handleEmail = (event) => {
    this.setState({email: event.target.value.toLowerCase()})
  };

  displayDialog = (msgTitle, msg) => {
    this.setState({dialog: true, msg, msgTitle})
  }

  handleClose = () => {
    this.setState({dialog: false})
  }

  recuperarEmail = () => {
    let dialog = this.displayDialog
    this.props.firebase.auth().sendPasswordResetEmail(this.state.email).then(function() {
          dialog('E-mail enviado', 'E-mail de recuperação enviado. Continue a operação verificando sua caixa de mensagens')
        }).catch(function(error) {
          dialog('E-mail incorreto', 'Digite um e-mail cadastrado em nosso sistema')
        });

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
        marginBottom: '-5000px',
        paddingBottom: '5000px',
        overflow: 'hidden'
      }
    }



    return (
      <div style={styles.root}>
        <Dialog
          title={this.state.msgTitle}
          actions={null}
          modal={false}
          open={this.state.dialog}
          onRequestClose={this.handleClose}
        >
        {this.state.msg}
        </Dialog>

        <img src={logo} alt="" className="img-fluid mx-auto d-block"/>
        <h6 style={styles.text}>Esqueci a senha</h6>
        <div className="container">
          <form onSubmit={this.handleSubmit} className="form-group">
              <input
                placeholder="E-mail"
                style={styles.inputText}
                value={this.state.email}
                onChange={this.handleEmail}
                className="form-control"
              />
            <input
              type="button"
              className="btn btn-block loginBtn"
              style={styles.button}
              value="Enviar confirmação"
              onClick={this.recuperarEmail}
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
