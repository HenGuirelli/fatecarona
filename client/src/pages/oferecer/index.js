import React, { Component } from 'react'
import { connect } from 'react-redux'
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import DateIcon from 'material-ui/svg-icons/action/date-range'
import TimeIcon from 'material-ui/svg-icons/action/schedule'
import CadeiranteIcon from '../../components/LiftMgt/cadeirante_branco.png'
import SmokingIcon from '../../components/LiftMgt/fumante_branco.png'
import MusicIcon from '../../components/LiftMgt/musica_branco.png'
import CarIcon from '../../components/Veiculo/veiculo_branco.png'
import { buscarRotas } from '../../actions/mapActions'
import { loadCar } from '../../actions/carActions'
import { offerLift } from '../../actions/liftActions'
import styles from '../oferecer/styles'
//import config from '../../config.json'
//import axios from 'axios'

class Oferecer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      hora: {},
      direcao: '',
      veiculo: undefined,
      trajeto: 'default',
      prefs: {deficientes: 0, fumantes: 0, musica: 0}
    };
  }

  handleData = (event, data) => {
    this.setState({data})
  }

  handleHora = (event, hora) => {
    this.setState({hora})
  }

  handleTrajeto = (event) => {
    this.setState({trajeto: event.target.value})
  }

  handlePrefs = (label) => {
    let auxPrefs = this.state.prefs
    auxPrefs[label] = !auxPrefs[label]
    this.setState({prefs: auxPrefs})
  }

  handleDirection = (direcao) => {
    this.setState({direcao})
  }

  handleVeiculo = (veiculo) => {
    this.setState({veiculo})
  }

  isSubmitInvalid = () => {
    const { data, hora, direcao, trajeto, veiculo } = this.state
    if ( data.getDate === undefined || hora.getDate === undefined || veiculo === undefined
        || direcao === '' || trajeto === 'default') return true

    return false
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.isSubmitInvalid()) {
      window.displayDialog({title: "Erro:", msg: "Favor preencher todos os campos"})
      return
    }
    const { data, hora, direcao, /*trajeto,*/ veiculo, prefs } = this.state
    const { rotas, userData } = this.props
    const lift = {
      dataCarona: data.toISOString().substr(0,10) + ' ' + hora.toTimeString().substr(0, 8),
      rota: rotas.find(rota => rota.nomeRota === this.state.trajeto)._id,
      emailMotorista: userData.email,
      acessibilidade: prefs['deficientes'],
      fumantes: prefs['fumantes'],
      musica: prefs['musica'],
      veiculo: veiculo.id,
      qtdVagas: 1,
      kilometragem: 0,
      tipo: direcao,
      status: 'pendente',
    }
    this.props.dispatch(offerLift(lift))
  }

  componentWillMount() {
    this.props.dispatch(loadCar(this.props.userData.email))
  }

  render() {

    const now = new Date()
    const { rotas, userData, needLoad, veiculos } = this.props

    if (userData.email && needLoad) this.props.dispatch(buscarRotas(userData.email))

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
                    value={this.state.data}
                    onChange={this.handleData}
                    hintText=" "
                  />
                  <DateIcon style={styles.icons}/>
                </div>
              </div>
              <div className="col-6">
                <div style={styles.box}>
                  HORA
                  <TimePicker
                    format="24hr"
                    okLabel="Confirmar"
                    cancelLabel="Cancelar"
                    value={this.state.hora}
                    onChange={this.handleHora}
                    textFieldStyle={styles.time}
                    className="timePicker"
                    hintText=" "
                  />
                  <TimeIcon style={styles.icons}/>
                </div>
              </div>
            </div>
            <div style={{paddingBottom: '2em', margin: '0 1px', borderBottom: '2px solid grey'}}>
                <center>
                <div style={styles.title}>VOCÊ VAI...</div>
                <div className="btn-group btn-group-toggle form-control" data-toggle="buttons" style={{border: 'none'}}>
                  <label className="btn loginBtn" style={styles.buttonL} onClick={() => this.handleDirection('indo para a FATEC')}>
                    <input type="radio" id="opt1" autoComplete="off" style={{position: 'absolute', display: 'none'}}/>
                    <div>IR À FATEC</div>
                  </label>
                  <label className="btn loginBtn" style={styles.buttonR} onClick={() => this.handleDirection('saindo da FATEC')}>
                    <input type="radio" id="opt1" autoComplete="off" style={{position: 'absolute', display: 'none'}}/>
                    <div>SAIR DA FATEC</div>
                  </label>
                </div>
                </center>
            </div>
            <div style={{paddingBottom: '2em', margin: '0 1px', borderBottom: '2px solid grey'}}>
              <center style={styles.title}>VEÍCULO</center>
              <div  className="btn-group btn-group-toggle form-control" data-toggle="buttons" style={{border: 'none'}}>
                {veiculos.map((car, key) => {
                  if (car.ativo) {
                    return <center className="col-6" key={key} onClick={() => this.handleVeiculo(car)}>
                      <label className="btn loginBtn" style={styles.carBtn}>
                        <input type="radio" id={"opt" + key} autoComplete="off" defaultChecked style={{position: 'absolute', display: 'none'}}/>
                        <img style={{width: '3.5em', height: '1.5em', margin:'0'}} src={CarIcon} alt={"Car Logo"}/>
                      </label>
                      <div>{car.placa}</div>
                    </center>
                  }
                  return null
                })
                }
              </div>
            </div>
            <div style={{paddingBottom: '2em', margin: '0 1px', borderBottom: '2px solid grey'}}>
              <center>
                <div style={styles.title}>TRAJETO</div>
                <select style={styles.buttonR} className="form-control" value={this.state.trajeto} onChange={this.handleTrajeto}>
                  <option value="default">Selecione...</option>
                  {rotas ? rotas.map((rota, key) =>
                    <option value={rota.nomeRota} key={key}>{rota.nomeRota}</option>
                  ) : null}
                </select>
              </center>
            </div>
            <center>
              <div style={styles.title}>PREFERÊNCIAS</div>
              <div  className="row btn-group-toggle" data-toggle="buttons">
                <center className="col-4">
                    <label className="btn loginBtn" style={styles.iconBG} onClick={() => this.handlePrefs('deficientes')}>
                      <input type="checkbox" style={{position: 'absolute', display: 'none'}}/>
                      <img src={CadeiranteIcon} alt={"Cadeirante Icon"} style={styles.prefIcons}/>
                    </label>
                    <div>Acomodação de Deficientes</div>
                </center>
                <center className="col-4">
                    <label className="btn loginBtn" style={styles.iconBG} onClick={() => this.handlePrefs('fumantes')}>
                      <input type="checkbox" style={{position: 'absolute', display: 'none'}}/>
                      <img src={SmokingIcon} alt={"Fumante Icon"} style={styles.prefIcons}/>
                    </label>
                    <div>Aceitação de Fumantes</div>
                </center>
                <center className="col-4">
                    <label className="btn loginBtn" style={styles.iconBG} onClick={() => this.handlePrefs('musica')}>
                      <input type="checkbox" style={{position: 'absolute', display: 'none'}}/>
                      <img src={MusicIcon} alt={"Music Icon"} style={styles.prefIcons}/>
                    </label>
                    <div>Ouvintes de Muita Música</div>
                </center>
              </div>
            </center>
            <input type="submit" value="Oferecer Carona" className="btn loginBtn form-control" style={styles.button}/>
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
    veiculos: store.car.veiculos,
    rotas: store.map.rotas,
    needLoad: store.map.needLoad
  }
})(Oferecer)
