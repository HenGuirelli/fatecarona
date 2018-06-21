import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../LiftMgt/styles'
import config from '../../config.json'
import axios from 'axios'
import Avatar from 'material-ui/Avatar'
import CadeiranteIcon from '../LiftMgt/cadeirante_roxo.png'
import FumanteIcon from '../LiftMgt/fumante_roxo.png'
import SocketIOChat from '../SocketIOChat'
import MusicIcon from '../LiftMgt/musica_roxo.png'
import CarIcon from '../Veiculo/veiculo_preto.png'
import LugarIcon from '../Veiculo/lugares_preto.png'
import { loadCarbyID } from '../../actions/carActions'
import GoogleMaps from '../../components/GoogleMaps'

class GerencCarona extends Component {
  constructor(props){
    super(props);
    this.state = {
      members: [],
      loaded: false
    };
  }

  saveFunc = f => {
    this.displayRoute = f;
  }

  loadMembersData = () =>{
    axios.get(config.endpoint + "/members/" + this.props.carona.emailMotorista)
    .then(resultMotorista => {
      axios.get(config.endpoint + "/lift/members/" + this.props.carona.id)
      .then(resultMembers =>{
        this.buscarMembros(resultMembers.data)
        .then(resultMemberData =>{
          this.setState({
            members: resultMemberData.concat(resultMotorista.data),
            loaded: true
          })
        })
      })
    })
  }

  buscarMembros = (listaMembros) =>{
    var members =[];
    return new Promise((resolve, reject)=>{
      listaMembros.forEach((e, index)=>{
        axios.get(config.endpoint + "/members/" + e.emailCaronista)
        .then(result =>{
          members.push(result.data)
          if (index === listaMembros.length -1){
            resolve(members)
          }
        })
    })
    })
  }


  filterMembrosCarona = () =>{
    switch(this.props.carona.status) {
      case 'pendente':{
        return null
      }
      case 'andamento':{
        return <div>QUEM VAI NO CARRO</div>
      }
      case 'historico':{
        return <div>QUEM FOI NO CARRO</div>
      }
      default:{}
    }
  }




  componentWillMount() {
    this.props.dispatch(loadCarbyID(this.props.carona.veiculo))
  }

  componentDidMount() {
    const { carona } = this.props
    if (!carona.rota) return
    document.getElementById('collapseMap').className = 'collapse show'
    axios.get(config.endpoint + '/routes/route/' + carona.rota)
    .then(result => {
      const { origin, destination, waypoints } = result.data.rota
      this.displayRoute({
        origin,
        destination,
        waypoints
      }).then(() => {
        setTimeout(() => document.getElementById('collapseMap').className = 'collapse', 100);
      })
    })
  }

  render() {

    if (!this.state.loaded && typeof this.props.carona.id !== "undefined") this.loadMembersData()

    let carPlaca, carModelo,carMarca
    if(this.props.liftCar !== undefined){
      carPlaca = this.props.liftCar.placa
      carModelo = this.props.liftCar.modelo
      carMarca = this.props.liftCar.marca
    }
    /*if (! this.props.membrosFull && this.props.listaMembros.length > 0) {
      this.props.listaMembros.map((membro) =>
        this.props.dispatch(loadMembers(membro.emailCaronista))
      )
    }*/

    const { carona } = this.props
    let dataLift = new Date(carona.dataCarona)
    let dataCarona = (("0" + dataLift.getDate()).slice(-2) + "/" + ("0" + (dataLift.getMonth() + 1)).slice(-2) +
        "/" + dataLift.getFullYear())
    let horarioCarona = (dataLift.getHours() + ":" + ("0" + dataLift.getMinutes()).slice(-2))

    const instyle = {
      textStyle:{
        fontWeight: 'bold',
        textAlign: 'right'
      },
      textStyle2:{
        textAlign: 'left'
      },
      iconBG: {
        borderRadius: '45%',
        backgroundColor: '#6E4D8B',
        borderColor: '#ffffff',
        color: '#fff',
        fontSize: '21px',
      },
      prefIcons:{
        width:'2.2em', height: '2.1em',
      },
      prefText:{
        marginTop: '0.3em'
      },
      btn: {
        borderRadius: '8px',
        backgroundColor: '#6E4D8B',
        borderColor: '#ffffff',
        color: '#ffffff',
        fontSize: '11px',
        marginTop: '1.2em',
        width: '10em',
        height: '60%',

      },
      member:{
        marginTop: '0.5em'
      }

    }

    return(
      <div className="container">
        <center>
          <div style={{borderBottom: '1px solid grey', marginTop: '5em', paddingBottom: '25px'}}>
            <div>
                DETALHE DA CARONA
            </div>
            <div style={styles.btnContainer}>
              {
                carona.status === 'historico' ?
                <div>
                  <input type="button" style={styles.btn} className="btn btn-primary" value="Avaliar carona" />
                </div>
                :
                <div>
                  <input type="button" style={styles.btn} className="btn btn-primary" value="Desistir da carona" />
                </div>
              }
            </div>
          </div>

          <div style={{borderBottom: '1px solid grey', padding: '1em ' }}>
            <div className="row">
              <div className="col-6" style={instyle.textStyle}>
                STATUS:
              </div>
              <div className="col-6" style={instyle.textStyle2}>
                {carona.status === "pendente" ?
                  <span>Pendente</span>
                  :
                  <span>Ativa</span>
                }
              </div>
            </div>
            <div className="row">
              <div className="col-6" style={instyle.textStyle}>
                DIA:
              </div>
              <div className="col-6" style={instyle.textStyle2}>
                {dataCarona}
              </div>
            </div>
            <div className="row">
              <div className="col-6" style={instyle.textStyle}>
                HORA:
              </div>
              <div className="col-6" style={instyle.textStyle2}>
                {horarioCarona}
              </div>
            </div>
            <div className="row">
              <div className="col-6" style={instyle.textStyle}>
                TIPO:
              </div>
              <div className="col-6" style={instyle.textStyle2}>
                {carona.tipo}
              </div>
            </div>
          </div>

          <div style={{borderBottom: '1px solid grey', padding: '1em 1em'}}>
            <div style={{marginBottom: '1em'}}>
                PREFERÊNCIAS DA CARONA
            </div>
            <div className="row" style ={{marginTop: '1em'}}>
              <div className="col-4" style={instyle.textStyle}>
                <img src={CadeiranteIcon} alt={"Cadeirante Icon"} style={instyle.prefIcons}/>
              </div>
              <div className="col-8" style={instyle.textStyle2}>
                {carona.acessibilidade === 0 ?
                  <span>Não acomoda cadeirante</span>
                  :
                  <span>Acomoda cadeirante</span>
                }
              </div>
          </div>
            <div className="row" style ={{marginTop: '1em'}}>
              <div className="col-4" style={instyle.textStyle}>
                <img src={FumanteIcon} alt={"Fumante Icon"} style={instyle.prefIcons}/>
              </div>
              <div className="col-8" style={instyle.textStyle2}>
                {carona.fumantes === 0 ?
                  <span>Não é permitido de fumar</span>
                  :
                  <span>Permitido fumar</span>
                }
              </div>
            </div>
            <div className="row" style ={{marginTop: '1em'}}>
              <div className="col-4" style={instyle.textStyle}>
                <img src={MusicIcon} alt={"Music Icon"} style={instyle.prefIcons}/>
              </div>
              <div className="col-8" style={instyle.textStyle2}>
                {carona.musica === 0 ?
                  <span>Não é permitido ouvir música</span>
                  :
                  <span>Permitido ouvir música</span>
                }
              </div>
            </div>
          </div>

            <div style={{borderBottom: '1px solid grey', padding: '1em 0'}}>
              <div>
                  VEÍCULO
              </div>
              <div className="row" style ={{marginTop: '1em'}}>
                <div className="col-6" style={instyle.textStyle}>
                  <img style={{width: '4em', height: '1.7em'}} src={CarIcon} alt={"Car Icon"}/><br/>
                </div>
                <div className="col-6" style={instyle.textStyle2}>
                  {carPlaca}<br/>
                </div>
              </div>
              <div className="row">
                <div className="col-6" style={instyle.textStyle}>
                  <img style={{width: '1em', height: '1.2em'}} src={LugarIcon} alt={"Lugares Icon"}/>
                  <span>{carona.qtdVagas} Lugares</span>
                </div>
                <div className="col-6" style={instyle.textStyle2}>
                  {carMarca}, {carModelo}
                </div>
              </div>
            </div>

            <div style={{borderBottom: '1px solid grey', padding: '1em 0'}}>
              {
                this.filterMembrosCarona()
              }
              {
                carona.status !== 'pendente' ?
                this.state.members.map((member, key)=>
                  <div key={key} className="row" style={{padding: '1em'}}>
                    <div className="col-6" style={instyle.textStyle}>
                      <Avatar
                        src={member.img ? config.endpoint + "/images/" + member.img : ""}
                        size={50}
                      />
                    </div>
                    <div className="col-6" style={instyle.textStyle2}>
                      {member.nome.substring(0, member.nome.indexOf(" "))}<br />
                      {member.email === carona.emailMotorista ? <span>Motorista</span> : <span>Caronista</span>}
                    </div>
                  </div>
                  )
                :
                null
              }
            </div>
          <div>
            <input
              type="button"
              data-toggle="collapse"
              data-target="#collapseMap"
              aria-expanded="false"
              aria-controls="collapseMap"
              value="Visualizar rota"
              className="btn btn-primary"
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                width: '100%',
                backgroundColor: '#6E4D8B',
                borderColor: '#6E4D8B',
                margin: '25px 0'
              }}
            />
          </div>
          <div className="collapse" id="collapseMap">
            <GoogleMaps callback={this.saveFunc}/>
          </div>
          {
            carona.status === 'andamento' ?
            <div style={{padding: '1em 0', borderTop: '1px solid grey'}}>
              <div>CHAT</div>
              <div>
                <SocketIOChat idSala={"carona" + carona.id}/>
              </div>
            </div>
            :
            null
          }
        </center>
      </div>
    )
  }
}

export default connect(store => {
  return {
    userData: store.user.userData,
    veiculos: store.car.veiculos,
    liftCar: store.car.liftCar,
    listaMembros: store.lift.listaMembros,
    membrosFull: store.lift.membrosFull,
    members: store.lift.members,
    carona: store.lift.carona,
  }
})(GerencCarona)
