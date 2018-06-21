import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import config from '../../config.json'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker';
import DateIcon from 'material-ui/svg-icons/action/date-range'
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
      telefone: props.userData.telefone || '',
      motorista: props.userData.motorista || '',
      trem: props.userData.trem || '0',
      metro: props.userData.metro || '0',
      onibus: props.userData.onibus || '0',
      andando: props.userData.andando || '0',
      cnh: props.userData.cnh || '',
      validadeCNH: new Date(props.userData.validadeCNH),
      categoriaCNH: props.userData.categoriaCNH || '',
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

  handleMotorista = (event) => {
    this.setState({motorista: event.target.value})
  };

  handleCnh = (event) => {
    this.setState({cnh: event.target.value})
  };

  handleCategoraCNH = (event) => {
    this.setState({categoriaCNH: event.target.value})
  };

  handleValidadeCNH = (event, validadeCNH) => {
    this.setState({validadeCNH})
  }

  handleChegada = (event, date) => {
    this.setState({chegada: date})
  };

  handleSaida = (event, date) => {
    this.setState({saida: date})
  };

  handlePhone = (event) => {
    this.setState({telefone: event.target.value})
  }

  handleMetro = (event) => {
    this.setState({metro: event.target.value})
  }

  handleTrem = (event) => {
    this.setState({trem: event.target.value})
  }

  handleAndando = (event) => {
    this.setState({andando: event.target.value})
  }

  handleOnibus = (event) => {
    this.setState({onibus: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let myState = this.state;
    this.props.updateUser(this.props.userData.email, {
      apelido: myState.apelido,
      chegada: myState.chegada.toTimeString().substr(0, 8),
      saida: myState.saida.toTimeString().substr(0, 8),
      telefone: myState.telefone,
      img: myState.fileName,
      metro: myState.metro,
      trem: myState.trem,
      andando: myState.andando,
      onibus: myState.onibus,
      motorista: myState.motorista,
      cnh: myState.cnh,
      validadeCNH: myState.validadeCNH.toISOString().substr(0,10),
      categoriaCNH: myState.categoriaCNH
    });
    window.displayDialog({msg: "Dados alterados", actions: null}, "/")
  }

  render() {
    const { updating, needReload } = this.props

    const inStyles = {
      transporte:{
        marginTop: '0.5em',
        textAlign:'right'
      },
      inputOption: {
        width: '9em',
        borderRadius: '10px',
        borderWidth: '2px',
        borderColor: '#6E4D8B'
      },
      inputOption2: {
        width: '18em',
        borderRadius: '10px',
        borderWidth: '2px',
        borderColor: '#6E4D8B',
        textAlign: 'center'
      },
      inputNumber: {
        width: '9em',
        borderRadius: '10px',
        borderWidth: '2px',
        borderColor: '#6E4D8B'
      },
      date: {
        maxWidth: '100px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        border: '2px solid #6E4D8B'
      },
      icons: {
        position: 'absolute',
        height: '2em',
        width: '2em',
        top: '29px',
        left: '120px'
      },
    }
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
              <div className="row" style={{marginTop: '1em', padding: '2em 0', borderBottom: '2px solid grey'}}>
                <div className="col-12"  style={{textAlign:'left'}}>
                  <span>Telefone</span>
                  <input
                    type="number"
                    min="0"
                    style={styles.inputNumber}
                    value={this.state.telefone}
                    onChange={this.handlePhone}
                    className="form-control textInput"
                  />
                </div>
              </div>

              <div style={{padding: '2em 0', borderBottom: '2px solid grey'}}>
                GERALMENTE DE...
                <div className="row" style={{marginTop: '2em'}}>
                  <div className="col-6">
                    Metrô
                    <select className="form-control" style={inStyles.inputOption} value={this.state.metro} onChange={this.handleMetro}>
                      <option value='1'>SIM</option>
                      <option value='0'>NÃO</option>
                    </select>
                  </div>
                  <div className="col-6">
                    Ônibus
                    <select className="form-control" style={inStyles.inputOption} value={this.state.onibus} onChange={this.handleOnibus}>
                      <option value='1'>SIM</option>
                      <option value='0'>NÃO</option>
                    </select>
                  </div>
                </div>
                <div className="row" style={{marginTop: '2em'}} >
                  <div className="col-6">
                    Trem
                    <select className="form-control" style={inStyles.inputOption} value={this.state.trem} onChange={this.handleTrem}>
                      <option value='1'>SIM</option>
                      <option value='0'>NÃO</option>
                    </select>
                  </div>
                  <div className="col-6">
                    Andando
                    <select className="form-control" style={inStyles.inputOption} value={this.state.andando} onChange={this.handleAndando}>
                      <option value='1'>SIM</option>
                      <option value='0'>NÃO</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.title}>PERFIL DE MOTORISTA</div>
            <select className="form-control" style={inStyles.inputOption2} value={this.state.motorista} onChange={this.handleMotorista}>
              <option value='1'>SIM, SOU UM MOTORISTA</option>
              <option value='0'>NÃO SOU UM MOTORISTA</option>
            </select>
            {
              this.state.motorista === '1' ?
                <div  style={{marginTop: '1em', padding: '2em 0', borderBottom: '2px solid grey'}}>
                  <div className="row" >
                    <div className="col-6"  style={{textAlign:'left'}}>
                      Número da CNH
                      <input
                        type="number"
                        min="0"
                        style={inStyles.inputNumber}
                        value={this.state.cnh}
                        onChange={this.handleCnh}
                        className="form-control textInput"
                      />
                    </div>
                    <div className="col-6">
                      Categoria da CNH
                      <select className="form-control" style={inStyles.inputOption} value={this.state.categoriaCNH} onChange={this.handleCategoraCNH}>
                        <option value='B'>B</option>
                        <option value='C'>C</option>
                        <option value='D'>E</option>
                      </select>
                    </div>
                  </div>
                  <div className="row" style={{marginTop: '2em'}} >
                    <div className="col-6">
                      Validade da CNH
                      <div style={{textAlign:'left'}}>
                        <DatePicker
                          disableYearSelection={false}
                          minDate={new Date()}
                          formatDate={date => date.toLocaleDateString('pt-BR')}
                          textFieldStyle={inStyles.date}
                          className="datePicker"
                          value={this.state.validadeCNH}
                          onChange={this.handleValidadeCNH}
                          hintText=" "
                        />
                        <DateIcon style={inStyles.icons}/>
                      </div>
                    </div>
                  </div>
                </div>

              :
              null
            }
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
}, dispatch => {
  return {
    updateUser: (email, obj) => dispatch(updateUserData(email, obj))
  }
})(Perfil)
