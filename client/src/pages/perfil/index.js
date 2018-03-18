import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import TimePicker from 'material-ui/TimePicker'
import styles from './styles'

class Perfil extends Component {
  constructor(props) {
    super(props);
    const aux1 = props.userData.chegada ? props.userData.chegada.substr(0, 5).split(':') : null;
    const aux2 = props.userData.saida ? props.userData.saida.substr(0, 5).split(':') : null;
    this.state = {
      apelido: props.userData.apelido || '',
      fileName: 'Nenhum arquivo selecionado.',
      img: props.userData.img ? "http://localhost:8080/images/" + props.userData.img : "",
      chegada: aux1 ? new Date(null, null, null, aux1[0], aux1[1]) : null,
      saida: aux2 ? new Date(null, null, null, aux2[0], aux2[1]) : null,
      telefone: props.userData.telefone || ''
    };
  }

  handleImage = () => {
    if(this.refs.img.files.length > 0) {
      const url = URL.createObjectURL(this.refs.img.files[0])
      this.setState({img: url, fileName: this.refs.img.files[0].name});
      window.$('#avatar')[0].src = url;
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
    //to upload images we need to do this
    const formData = new FormData();
    formData.append('image', this.state.img);
  }

  render() {
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
                  <div style={{textAlign: 'left'}}>{this.state.fileName}</div>
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
                      okLabel="CONFIRMAR"
                      cancelLabel="CANCELAR"
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
                      okLabel="CONFIRMAR"
                      cancelLabel="CANCELAR"
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
            <div style={{padding: '2em 0'}}>
              NÚMERO DE TELEFONE
              <input
                type="number"
                style={styles.inputText}
                value={this.state.telefone}
                onChange={this.handlePhone}
                className="form-control textInput"
              />
            </div>
            <input type="submit" value="SALVAR" className="btn loginBtn form-control" style={styles.button}/>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    user: store.user.user,
    userData: store.user.userData
  }
})(Perfil)
