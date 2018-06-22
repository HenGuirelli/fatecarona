import React, { Component } from 'react'
import { connect } from 'react-redux'
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import DateIcon from 'material-ui/svg-icons/action/date-range'
import TimeIcon from 'material-ui/svg-icons/action/schedule'
import CadeiranteIcon from '../../components/LiftMgt/cadeirante_branco.png'
import SmokingIcon from '../../components/LiftMgt/fumante_branco.png'
import MusicIcon from '../../components/LiftMgt/musica_branco.png'
import { buscarRotas } from '../../actions/mapActions'
import { transferResults } from '../../actions/liftActions'
import GoogleMaps from '../../components/GoogleMaps'
import styles from '../oferecer/styles'
import config from '../../config.json'
import axios from 'axios'

class Pedir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      hora: {},
      direcao: '',
      trajeto: 'default',
      prefs: {deficientes: 0, fumantes: 0, musica: 0},
      searching: false
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

  saveFunc = (f1, f2, f3) => {
    this.displayRoute = f1
    this.renderCircles = f2
    this.circleContains = f3
  }

  isSubmitInvalid = () => {
    const { data, hora, direcao, trajeto } = this.state
    if ( data.getDate === undefined || hora.getDate === undefined
        || direcao === '' || trajeto === 'default') return true

    return false
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.isSubmitInvalid()) {
      window.displayDialog({title: "Erro:", msg: "Favor preencher todos os campos"})
      return
    }

    this.setState({searching: true})

    let match = []
    let params = this.state
    let rota = this.props.rotas.find(rota => rota.nomeRota === this.state.trajeto)
    let displayRoute = this.displayRoute
    let renderCircles = this.renderCircles
    let circleContains = this.circleContains

    axios.get(config.endpoint + '/lift')
    .then(result => {
      if (result.statusText === "OK") {
        match = result.data.filter(carona => {
          let dataCarona = new Date(carona.dataCarona)
          let dataAlvo = params.data
          dataAlvo.setHours(params.hora.getHours())
          dataAlvo.setMinutes(params.hora.getMinutes())
          // eslint-disable-next-line
          if (params.prefs['deficientes'] == carona.acessibilidade && params.prefs['fumantes'] == carona.fumantes && params.prefs['musica'] == carona.musica &&
              params.direcao === carona.tipo && dataCarona.getTime() >= dataAlvo.getTime() && carona.emailMotorista !== this.props.userData.email) return true

          return false
        })

        if (match.length === 0) {
          window.displayDialog({title: "Atenção", msg: "Nenhuma carona encontrada..."})
          this.setState({ searching: false })
          return
        }

        displayRoute(rota.rota)
        .then(path => {
          let subjectCircles = renderCircles(path)
          this.gatherRoutes(match)
          .then(matchResults => {
            var finalMatch = []
            matchResults.forEach((e, index) => {
              displayRoute(e.rota.rota)
              .then(path => {
                let found = false
                for (var i = 0; i < subjectCircles.length; i++) {
                  for (var j = 0; j < path.length; j++) {
                    if (circleContains(subjectCircles[i], path[j].lat(),  path[j].lng())) {
                      finalMatch.push(e)
                      found = true
                      break
                    }
                  }
                  if (found) break
                }
                if (index === (matchResults.length - 1)) {
                  if (finalMatch.length === 0) {
                    window.displayDialog({title: "Atenção", msg: "Nenhuma carona encontrada..."})
                    this.setState({ searching: false })
                    return
                  }
                  this.props.dispatch(transferResults(finalMatch))
                  this.props.history.push("/caronas/matches")
                }
              })
            })
          })
        })
      }
    })
  }

  gatherRoutes = (results) => {
    return new Promise((resolve, reject) => {
      results.forEach((e, index) => {
        axios.get(config.endpoint + '/routes/route/' + e.rota)
        .then(result => {
          e.rota = result.data
          if (index === (results.length - 1)) {
            resolve(results)
          }
        })
        .catch(err => reject(err))
      })
    })
  }

  setTimer = () => {
    setTimeout(() => this.setState({searching: false}), 5000)
  }

  render() {

    const now = new Date()
    const { rotas, userData, needLoad } = this.props

    if (userData.email && needLoad) this.props.dispatch(buscarRotas(userData.email))

    if (this.state.searching) return <div>
      Procurando...
      {this.setTimer()}
    </div>

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
                <div style={styles.title}>VOCÊ PRECISA...</div>
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
            <input type="submit" value="Buscar" className="btn loginBtn form-control" style={styles.button}/>
          </form>
          <GoogleMaps callback={this.saveFunc} hidden={true}/>
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    user: store.user.user,
    userData: store.user.userData,
    rotas: store.map.rotas,
    needLoad: store.map.needLoad
  }
})(Pedir)
