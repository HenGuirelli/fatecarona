import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../LiftMgt/styles'
import CadeiranteIcon from '../LiftMgt/cadeirante_roxo.png'
import FumanteIcon from '../LiftMgt/fumante_roxo.png'
import MusicIcon from '../LiftMgt/musica_roxo.png'
import CarIcon from '../Veiculo/veiculo_preto.png'
import LugarIcon from '../Veiculo/lugares_preto.png'
import { loadCarbyID } from '../../actions/carActions'


class GerencCarona extends Component {

  componentWillMount() {
    this.props.dispatch(loadCarbyID(this.props.carona.veiculo))
  }

  render() {
    const { carona, liftCar } = this.props
    let dataLift = new Date(carona.dataCarona)
    let dataCarona = (("0" + dataLift.getDate()).slice(-2) + "/" + ("0" + (dataLift.getMonth() + 1)).slice(-2) +
        "/" + dataLift.getFullYear())
    let horarioCarona = (dataLift.getUTCHours() + ":" + ("0" + dataLift.getUTCMinutes()).slice(-2))

    const instyle = {
      textStyle:{
        fontWeight: 'bold',
        textAlign: 'right'
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
        float: 'right'
      },
      prefText:{
        marginTop: '0.3em'
      }

    }

    return(
      <div className="container">
        <center>
          <div style={{borderBottom: '1px solid grey', marginTop: '5em'}}>
            <div>
                DETALHE DA CARONA
            </div>
            <div style={styles.btnContainer}>
              {carona.status === "pendente" ?
                <input type="button" style={styles.btn} className="btn btn-primary" value="Desistir da carona" />
                :
                <input type="button" style={styles.btn} className="btn btn-primary" value="Avaliar carona" />
              }
            </div>
          </div>

          <div style={{borderBottom: '1px solid grey', margin: '1em ' }}>
            <div className="row">
              <div className="col-6" style={instyle.textStyle}>
                STATUS:
              </div>
              <div className="col-0">
                {carona.status === "pendente" ?
                  <span>PENDENTE</span>
                  :
                  <span>ATIVA</span>
                }
              </div>
            </div>
            <div className="row">
              <div className="col-6" style={instyle.textStyle}>
                DIA:
              </div>
              <div className="col-0">
                {dataCarona}
              </div>
            </div>
            <div className="row">
              <div className="col-6" style={instyle.textStyle}>
                HORA:
              </div>
              <div className="col-0">
                {horarioCarona}
              </div>
            </div>
            <div className="row">
              <div className="col-6" style={instyle.textStyle}>
                TIPO:
              </div>
              <div className="col-0">
                {carona.tipo}
              </div>
            </div>
          </div>

          <div style={{borderBottom: '1px solid grey', margin: '1em 0'}}>
            <div>
                PREFERÊNCIAS DA CARONA
            </div>

            <div className="row" style ={{marginTop: '1em'}}>
              <div className="col-5">
                <img src={CadeiranteIcon} alt={"Cadeirante Icon"} style={instyle.prefIcons}/>
              </div>
              {carona.acessibilidade === 0 ?
                <div>NÃO ACOMODA CADEIRANTE</div>
                :
                <div>ACOMODA CADEIRANTE</div>
              }
            </div>
            <div className="row" style ={{marginTop: '1em'}}>
              <div className="col-5">
                <img src={FumanteIcon} alt={"Fumante Icon"} style={instyle.prefIcons}/>
              </div>
              <div className="col-0" style={instyle.prefText}>
                {carona.fumantes === 0 ?
                  <div>NÃO FUMAR</div>
                  :
                  <div>PERMITIDO FUMAR</div>
                }
              </div>
            </div>
            <div className="row" style ={{marginTop: '1em'}}>
              <div className="col-5">
                <img src={MusicIcon} alt={"Music Icon"} style={instyle.prefIcons}/>
              </div>
              <div className="col-0" style={instyle.prefText}>
                {carona.musica === 0 ?
                  <div>NÃO É PERMITIDO OUVIR MÚSICA</div>
                  :
                  <div>PERMITIDO OUVIR MÚSICA</div>
                }
              </div>
            </div>
          </div>

          <div style={{borderBottom: '1px solid grey', margin: '1em 0'}}>
            <div>
                VEÍCULO
            </div>

            <div className="row" style ={{marginTop: '1em'}}>
              <div className="col-6">
                  <img style={{width: '4em', height: '1.7em', float:'right'}} src={CarIcon} alt={"Car Icon"}/>
              </div>
              <div className="col-0" style={instyle.prefText}>
                {liftCar.map((veiculo, key)=>
                  <div key={key}>
                    {veiculo.placa}
                  </div>
                )
                }
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="row" style={{textAlign:'right'}}>
                  <div className="col-8 col-sm-8 col-md-9 col-lg-10 col-xl-10">
                    <img style={{width: '1em', height: '1.2em', float: 'right'}} src={LugarIcon} alt={"Lugares Icon"}/>
                  </div>
                  <div className="col-0">
                    <span >{carona.qtdVagas} Lugares</span>
                  </div>
                </div>
              </div>
              {liftCar.map((veiculo, key)=>
                <div key={key}>
                  {veiculo.marca}, {veiculo.modelo}
                </div>
              )
              }
            </div>
          </div>

        </center>
      </div>
    )
  }
}

export default connect(store => {
  return {
    liftCar: store.car.liftCar,
    userData: store.user.userData,
    veiculos: store.car.veiculos,
    carona: store.lift.carona,
  }
})(GerencCarona)
