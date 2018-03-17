import React, { Component } from 'react'
import { connect } from 'react-redux'
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import DateIcon from 'material-ui/svg-icons/action/date-range'
import TimeIcon from 'material-ui/svg-icons/action/schedule'
import CarIcon from 'material-ui/svg-icons/maps/directions-car'
import './index.css'

class Oferecer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chegada: '',
      saida: '',
    };
  }

  handleChegada = (event, date) => {
    this.setState({chegada: date})
  };

  handleSaida = (event, date) => {
    this.setState({saida: date})
  };

  handleSubmit = () => {
    //to upload images we need to do this
    const formData = new FormData();
    formData.append('image', this.state.img);
  }

  render() {

    const styles = {
      button: {
        margin: '25px 0',
        borderRadius: '25px',
        backgroundColor: '#6E4D8B',
        borderColor: '#a8cf45',
        color: '#a8cf45',
        fontSize: '25px',
      },
      buttonL: {
        borderBottomLeftRadius: '25px',
        borderTopLeftRadius: '25px',
        backgroundColor: '#6E4D8B',
        borderColor: '#a8cf45',
        color: '#a8cf45',
        fontSize: '15px',
        width: '50%'

      },
      buttonR: {
        borderBottomRightRadius: '25px',
        borderTopRightRadius: '25px',
        backgroundColor: '#6E4D8B',
        borderColor: '#a8cf45',
        color: '#a8cf45',
        fontSize: '15px',
        width: '50%'
      },
      carBtn: {
        borderRadius: '25px',
        backgroundColor: '#6E4D8B',
        borderColor: '#a8cf45',
        color: '#fff',
        fontSize: '21px',
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
      },
      time: {
        maxWidth: '100px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        border: '2px solid #6E4D8B'
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
        left: '101px'
      },
      box: {
        position: 'relative', 
        width: '131px', 
        margin: '0 auto'
      }
    }

    const now = new Date()

    return (
      <div className="pageBase">
        <div className="container">
          <form onSubmit={this.handleSubmit} className="form-group">
            <div className="row" style={{padding: '2em 0', margin: '0 1px', borderBottom: '2px solid grey'}}>
              <div className="col-6">
                <div style={styles.box}>
                  DIA
                  <DatePicker 
                    disableYearSelection={true}
                    minDate={new Date()}
                    maxDate={new Date(now.setMonth(now.getMonth() + 1))}
                    formatDate={date => date.toLocaleDateString('pt-BR')}
                    textFieldStyle={styles.date}
                    className="datePicker"
                    hintText=" "
                  />
                  <DateIcon style={styles.icons}/>
                </div>
              </div>
              <div className="col-6">
                <div style={styles.box}>
                  HORA
                  <TimePicker
                    format="ampm"
                    okLabel="CONFIRMAR"
                    cancelLabel="CANCELAR"
                    value={this.state.SAIDA}
                    onChange={this.handleSaida}
                    textFieldStyle={styles.time}
                    className="timePicker"
                    hintText=" "
                  />
                  <TimeIcon style={styles.icons}/>
                </div>
              </div>
            </div>
            <div style={{padding: '2em 0', margin: '0 1px', borderBottom: '2px solid grey'}}>
                <center>
                <div>VOCÊ VAI...</div>
                <div className="btn-group form-control" style={{border: 'none'}}>
                  <input type="button" value="IR À FATEC" className="btn loginBtn" style={styles.buttonL}/>
                  <input type="button" value="SAIR DA FATEC" className="btn loginBtn" style={styles.buttonR}/>
                </div>
                </center>
            </div>
            <div style={{padding: '2em 0', margin: '0 1px', borderBottom: '2px solid grey'}}>
              <center>VEÍCULO</center>
              <div  className="row btn-group-toggle" data-toggle="buttons">
                <center className="col-6">
                    <label className="btn loginBtn" style={styles.carBtn}>
                      <input type="checkbox" style={{position: 'absolute', display: 'none'}}/>
                      <CarIcon color="#fff" style={{width: '2em', height: '2em'}}/>
                      <div>GHJ-8930</div>
                    </label>
                </center>
                <center className="col-6">
                    <label className="btn loginBtn" style={styles.carBtn}>
                      <input type="checkbox" style={{position: 'absolute', display: 'none'}}/>
                      <CarIcon color="#fff" style={{width: '2em', height: '2em'}}/>
                      <div>YUJ-7381</div>
                    </label>
                </center>
              </div>
            </div>
            <div style={{padding: '2em 0', margin: '0 1px', borderBottom: '2px solid grey'}}>
              <center>
                <div>TRAJETO</div>
                <select className="form-control" defaultValue="default">
                  <option value="default">Selecione...</option>
                  <option>Trajeto1</option>
                </select>
              </center>
            </div>
            <center>
              <div>SELECIONE A COMODIDADE DA CARONA</div>
            </center>
            <input type="submit" value="CONFIRMAR" className="btn loginBtn form-control" style={styles.button}/>
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
})(Oferecer)