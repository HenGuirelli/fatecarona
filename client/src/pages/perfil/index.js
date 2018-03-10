import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import TimePicker from 'material-ui/TimePicker';

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apelido: props.userData.nome,
      fileName: 'Nenhum arquivo selecionado.',
      img: props.userData.img ? "http://localhost:8080/images/" + props.userData.img : ""
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

  handleCel = (event) => {
    this.setState({cel: event.target.value})
  }

  handleSubmit = () => {
    //to upload images we need to do this
    const formData = new FormData();
    formData.append('image', this.state.img);
  }

  render() {
    const { userData } = this.props

    const styles = {
      button: {
        margin: '25px 0',
        borderRadius: '25px',
        backgroundColor: '#6E4D8B',
        borderColor: '#a8cf45',
        color: '#a8cf45',
        fontSize: '25px',
      },
      inputText: {
        margin: '25px 0',
        borderRadius: '10px',
      },
      file: {
        width: '0.1px',
        height: '0.1px',
        opacity: 0,
        overflow: 'hidden',
        position: 'absolute',
        zIndex: -1,
      },
      fileLabel: {
        zIndex: 0,
        borderRadius: '20px',
        width: '10em',
        marginLeft: '-20px'
      }
    }

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
              Apelido:
              <input
                style={styles.inputText}
                value={this.state.apelido}
                onChange={this.handleApelido}
                className="form-control"
              />
            </div>
            <div style={{padding: '2em 0', borderBottom: '2px solid grey'}}>
              Meus horários:
              <TimePicker
                format="ampm"
                hintText="CHEGADA"
                okLabel="CONFIRMAR"
                cancelLabel="CANCELAR"
                value={this.state.chegada}
                onChange={this.handleChegada}
              />
              <TimePicker
                format="ampm"
                hintText="SAIDA"
                okLabel="CONFIRMAR"
                cancelLabel="CANCELAR"
                value={this.state.SAIDA}
                onChange={this.handleSaida}
              />
            </div>
            <div style={{padding: '2em 0'}}>
              Número de telefone:
              <input
                style={styles.inputText}
                value={this.state.cel}
                onChange={this.handleCel}
                className="form-control"
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