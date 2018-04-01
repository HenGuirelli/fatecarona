import React, { Component } from 'react'
import styles from '../LiftMgt/styles'
import CadeiranteIcon from '../LiftMgt/cadeirante_roxo.png'
import FumanteIcon from '../LiftMgt/fumante_roxo.png'
import MusicIcon from '../LiftMgt/musica_roxo.png'
import CarIcon from '../Veiculo/veiculo_preto.png'
import LugarIcon from '../Veiculo/lugares_preto.png'


export default class LiftPend extends Component {
  render() {
    const {dia, hora, tipo } = this.props

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
      <div className="container" style={styles.root}>
        <center>
          <div style={{borderBottom: '1px solid grey', margin: '1em 0'}}>
            <div>
                DETALHE DA CARONA
            </div>
            <div style={styles.btnContainer}>
              <input type="button" style={styles.btn2} className="btn btn-primary" value="Desistir da carona" />
            </div>
          </div>

          <div style={{borderBottom: '1px solid grey', margin: '1em ' }}>
            <div className="row">
              <div className="col-6" style={instyle.textStyle}>
                STATUS:
              </div>
              <div className="col-0">
                PENDENTE
              </div>
            </div>
            <div className="row">
              <div className="col-6" style={instyle.textStyle}>
                DIA:
              </div>
              <div className="col-0">
                {dia}
              </div>
            </div>
            <div className="row">
              <div className="col-6" style={instyle.textStyle}>
                HORA:
              </div>
              <div className="col-0">
                {hora}
              </div>
            </div>
            <div className="row">
              <div className="col-6" style={instyle.textStyle}>
                TIPO:
              </div>
              <div className="col-0">
                {tipo}
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
              <div className="col-0" style={instyle.prefText}>
                NÃO ACOMODA CADEIRANTE
              </div>
            </div>
            <div className="row" style ={{marginTop: '1em'}}>
              <div className="col-5">
                <img src={FumanteIcon} alt={"Fumante Icon"} style={instyle.prefIcons}/>
              </div>
              <div className="col-0" style={instyle.prefText}>
                NÃO FUMAR
              </div>
            </div>
            <div className="row" style ={{marginTop: '1em'}}>
              <div className="col-5">
                <img src={MusicIcon} alt={"Music Icon"} style={instyle.prefIcons}/>
              </div>
              <div className="col-0" style={instyle.prefText}>
                PERMITIDO OUVIR MÚSICA
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
                  FLP-1297
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="row" style={{textAlign:'right'}}>
                  <div className="col-8 col-sm-8 col-md-9 col-lg-10 col-xl-10">
                    <img style={{width: '1em', height: '1.2em', float: 'right'}} src={LugarIcon} alt={"Lugares Icon"}/>
                  </div>
                  <div className="col-0">
                    <span >2 Lugares</span>
                  </div>
                </div>
              </div>
              <div>
                HB20, HYUNDAI
              </div>
            </div>
          </div>

        </center>
      </div>
    )
  }
}
