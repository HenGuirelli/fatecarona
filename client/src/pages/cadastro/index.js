import React, { Component } from 'react'
import { connect } from 'react-redux'
import { insertUser } from '../../actions/userActions'
import Dialog from 'material-ui/Dialog'

class Cadastro extends Component {
  constructor() {
    super()
    this.state = {
      email: '', 
      senha: '', 
      nome: '', 
      cel: '', 
      ra: '', 
      dialog: false,
      msg: ''
    }
  }

  handleEmail = (event) => {
    this.setState({email: event.target.value.toLowerCase()})
  };

  handlePassword = (event) => {
    this.setState({senha: event.target.value})
  };

  handleNome = (event) => {
    this.setState({nome: event.target.value})
  };

  handleCel = (event) => {
    this.setState({cel: event.target.value})
  };

  handleRA = (event) => {
    this.setState({ra: event.target.value})
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const { email, senha, nome, cel, ra } = this.state
    if(email.length === 0 || senha.length === 0 || nome.length === 0 || cel.length === 0 || ra.length === 0) {
      this.displayDialog("Favor Preencher todos os campos!")
      return
    }
    if (!email.match('@fatec.sp.gov.br')) {
      this.displayDialog('Utilize um email institucional! ex:"@fatec.sp.gov.br"')
      return
    }
    if (!/[0-9]{5}-[0-9]{4}/.test(cel)) {
      this.displayDialog('Numero com formato inválido. ex:"99999-9999"')
    }
    this.props.firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then(
      this.props.dispatch(insertUser({
        ra,
        nome,
        email
      }))
    )
    .catch((error) => {
      this.displayModal(error.message)
    });
  }

  displayDialog(msg) {
    this.setState({dialog: true, msg})
  }

  handleClose = () => {
    this.setState({dialog: false})
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
      root: {
        paddingTop: '5em',
        marginTop: '-58px',
        backgroundColor: '#6E4D8B',
        marginBottom: '-5000px',
        paddingBottom: '5000px',
        overflow: 'hidden'
      }
    }

    //const { firebase } = this.props
    return (
      <div style={styles.root}>
          <Dialog
            title="Erro:"
            actions={null}
            modal={false}
            open={this.state.dialog}
            onRequestClose={this.handleClose}
          >
          {this.state.msg}
          </Dialog>
          <div className="container">
            <form onSubmit={this.handleSubmit} className="form-group">
                <input
                  placeholder='RA'
                  style={styles.inputText}
                  value={this.state.ra}
                  onChange={this.handleRA}
                  className="form-control"
                />
                <input
                  placeholder='E-mail, exemplo: "foo.bar1@fatec.sp.gov.br"'
                  style={styles.inputText}
                  value={this.state.email}
                  onChange={this.handleEmail}
                  className="form-control"
                />
                <input
                  placeholder="Nome"
                  style={styles.inputText}
                  value={this.state.nome}
                  onChange={this.handleNome}
                  className="form-control"
                />
                <input
                  placeholder="Senha"
                  style={styles.inputText}
                  value={this.state.senha}
                  onChange={this.handlePassword}
                  type="password"
                  className="form-control"
                />
                <input
                  placeholder="Nº Celular"
                  style={styles.inputText}
                  value={this.state.cel}
                  onChange={this.handleCel}
                  className="form-control"
                />
              <input
                type="submit"
                className="btn btn-primary btn-block loginBtn" 
                style={styles.button} value="CADASTRAR" />
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