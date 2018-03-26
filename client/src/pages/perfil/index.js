import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import config from '../../config.json'
import TimePicker from 'material-ui/TimePicker'
import styles from './styles'
import { updateUserData } from '../../actions/userActions'

class Perfil extends Component {
  constructor(props) {
    super(props);
    const aux1 = props.userData.chegada ? props.userData.chegada.substr(0, 5).split(':') : null;
    const aux2 = props.userData.saida ? props.userData.saida.substr(0, 5).split(':') : null;
    this.state = {
      apelido: props.userData.apelido || '',
      fileName: props.userData.img || 'Nenhum arquivo selecionado.',
      img: props.userData.img ? config.endpoint + "/images/" + props.userData.img : "",
      chegada: aux1 ? new Date(null, null, null, aux1[0], aux1[1]) : null,
      saida: aux2 ? new Date(null, null, null, aux2[0], aux2[1]) : null,
      telefone: props.userData.telefone || ''
    };
  }

  handleImage = () => {
    if(this.refs.img.files.length > 0) {
      let formData = new FormData();
      const url = URL.createObjectURL(this.refs.img.files[0]);
      formData.set('image', this.refs.img.files[0]);
      fetch(config.endpoint + '/images', {
        method: 'POST',
        body: formData
      }).then(res => res.text())
      .then(fileName => {
        this.setState({img: url, fileName});
      });
    }
  };

  handleApelido = (event) => {
    this.setState({apelido: event.target.value})
  };

  handleChegada = (event, date) => {
    this.setState({chegada: date})
  };

  handleSaida = (event, date) => {
    this.setState({saida: date})
  };

  handlePhone = (event) => {
    this.setState({telefone: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let myState = this.state;
    this.props.dispatch(updateUserData(this.props.userData.email, {
      apelido: myState.apelido,
      chegada: myState.chegada.toTimeString().substr(0, 8),
      saida: myState.saida.toTimeString().substr(0, 8),
      telefone: myState.telefone,
      img: myState.fileName
    }));
  }

  render() {
    const { updating, needReload } = this.props
    if (updating) return <div>Loading...</div>
    else if (needReload) return <div>Informações atualizadas!</div>
    return (
      <div className="pageBase">
        <div className="container">
          <form onSubmit={this.handleSubmit} className="form-group">
            <div style={{padding: '2em 0', borderBottom: '2px solid grey'}}>
              <div style={{position: 'relative', width: '300px', margin: '0 auto'}}>
                <Avatar
                  id="avatar"
                  src={this.state.img}
                  size={150}
                  style={{zIndex: 1, position: 'relative', border: '3px solid #fff'}}
                />
                <div style={{width: '9em', position: 'absolute', top: '52px', left: '144px'}}>
                  <input style={styles.file} type="file" id="file" accept="image/*" ref="img" onChange={this.handleImage}/>
                  <label htmlFor="file" style={styles.fileLabel} className="btn btn-primary">Alterar foto</label>
                  <div style={{textAlign: 'left', overflowWrap: 'break-word'}}>{this.state.fileName}</div>
                </div>
              </div>
            </div>
            <div style={{padding: '2em 0', borderBottom: '2px solid grey'}}>
              APELIDO
              <input
                style={styles.inputText}
                value={this.state.apelido}
                onChange={this.handleApelido}
                className="form-control textInput"
              />
            </div>
            <div style={{padding: '2em 0', borderBottom: '2px solid grey'}}>
              <div style={{marginBottom: '25px'}}>MINHA ROTINA</div>
              <div className="row">
                <div className="col-6">
                  <div style={styles.box}>
                    <TimePicker
                      format="24hr"
                      hintText=" "
                      okLabel="Confirmar"
                      cancelLabel="Cancelar"
                      value={this.state.chegada}
                      onChange={this.handleChegada}
                      className="timePicker"
                      textFieldStyle={styles.time}
                    />
                    chego na fatec
                  </div>
                </div>
                <div className="col-6">
                  <div style={styles.box}>
                    <TimePicker
                      format="24hr"
                      hintText=" "
                      okLabel="Confirmar"
                      cancelLabel="Cancelar"
                      value={this.state.saida}
                      onChange={this.handleSaida}
                      className="timePicker"
                      textFieldStyle={styles.time}
                    />
                    saio da fatec
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div style={{padding: '2em 0', borderBottom: '2px solid grey'}}>
                GERALMENTE DE...
                <div className="row">
                  <div className="col-6">
                    <input
                      type="number"
                      style={styles.inputTextCaminho}
                      value={this.state.telefone}
                      onChange={this.handlePhone}
                      className="form-control textInput"
                    />

                  </div>
                  <div className="col-6">
                    <input
                      type="number"
                      style={styles.inputTextCaminho}
                      value={this.state.telefone}
                      onChange={this.handlePhone}
                      className="form-control textInput"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      type="number"
                      style={styles.inputTextCaminho}
                      value={this.state.telefone}
                      onChange={this.handlePhone}
                      className="form-control textInput"
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="number"
                      style={styles.inputTextCaminho}
                      value={this.state.telefone}
                      onChange={this.handlePhone}
                      className="form-control textInput"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.title}>PERFIL DE MOTORISTA</div>
            <select className="form-control" defaultValue="default">
              <option value="default">SIM, SOU UM MOTORISTA</option>
              <option>NÃO SOU UM MOTORISTA</option>
            </select>
            <input type="submit" value="Salvar" className="btn loginBtn form-control" style={styles.button}/>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    user: store.user.user,
    userData: store.user.userData,
    updating: store.user.updating,
    needReload: store.user.needReload,
    error: store.user.error
  }
})(Perfil)
