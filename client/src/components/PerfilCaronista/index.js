import React, { Component } from 'react'
import Avaliador from '../../components/Avaliador'
import CadeiranteIcon from '../../components/LiftMgt/cadeirante_roxo.png'
import SmokingIcon from '../../components/LiftMgt/fumante_roxo.png'
import MusicIcon from '../../components/LiftMgt/musica_roxo.png'
import config from '../../config.json'
import axios from 'axios'
export default class Caronista extends Component {
  constructor(props){
    super(props);
    this.state = {
      fumante: 0,
      music: 0,
      defic: 0,
      qtdCaronas: 0,
      loaded: false,
      transporte: '',
      transpLoaded: false
    };
  }



  filterTransporte = (email) =>{
    var transporte = ''
    axios.get(config.endpoint + "/members/" + email)
      .then(result =>{
        let userData = result.data
        if (userData.metro) transporte = "Metrô"
        if (userData.andando) transporte = transporte.concat(" Andando")
        if (userData.onibus) transporte = transporte.concat(" Ônibus")
        if (userData.trem) transporte = transporte.concat(" Trem")
        if (this.state.transporte === '')
          this.setState({
            transporte: transporte.split(" "),
            transpLoaded: true
          })
      })
  }

  loadCarona = (email) => {
    var fumante=0
    var music=0
    var defic=0
    var qtdCaronas=0
    axios.get(config.endpoint + "/caronista/" + email)
    .then(resultMembroCaronas =>{
      return new Promise((resolve, reject)=>{
        resultMembroCaronas.data.forEach((e, index) => {
          axios.get(config.endpoint + "/lift/id/" + e.id)
          .then(result => {
            qtdCaronas++
            if(result.data[0].fumantes === 1) fumante++;
            if(result.data[0].musica === 1) music++;
            if(result.data[0].acessibilidade === 1) defic++;
            if (index === (resultMembroCaronas.data.length -1)){
              if (qtdCaronas > 0){
                fumante = (fumante/qtdCaronas)*100
                defic = (defic/qtdCaronas)*100
                music = (music/qtdCaronas)*100
                this.setState({
                  fumante: fumante,
                  music: music,
                  defic: defic,
                  loaded: true,
                  qtdCaronas: qtdCaronas
                })
              }
            }
          })
          .catch((err) => reject(err.message))
        })
      })
    })
  }

  render() {

    const styles = {
      text:{
        fontSize: '28px',
        font: 'bold',
        textAlign: 'center'
      },
      prefText:{
        fontSize: '12px',
      },
      valorText:{
        fontSize: '25px',
        font: 'bold'
      },
      prefIcons: {
        width:'2.3em',
        height: '2.3em',
        borderRadius: '45%',
        backgroundColor: '#6E4D8B',
        borderColor: '#ffffff',
        color: '#fff',
        fontSize: '21px',
      },
    }
    const {userEmail} = this.props
    if (!this.state.loaded && !this.state.transpLoaded){
      this.loadCarona(userEmail)
      this.filterTransporte(userEmail)
    }
    return(
      <div className="container">
        <div style={styles.content}>
          <div className="row">
            <div className="col-12">
              <Avaliador
                text="Avaliação"
                score={3.5}
              />
            </div>
          </div>
          <div className="row" style={{padding: '2em 0', borderBottom: '2px solid grey'}}>
              <center className="col-4">
                <div style={styles.text}>{this.state.qtdCaronas}</div>
                Caronas Realizadas
              </center>
              <center className="col-4">
                <div style={styles.text}>21</div>
                Caronas Avaliadas
              </center>
              <center className="col-4">
                <div style={styles.text}>5</div>
                Caronas 5 estrelas
              </center>
          </div>
          {
            this.state.transporte !== '' && this.state.transporte[0] !== '' ?
              <center className="row" style={{padding: '2em 0', borderBottom: '2px solid grey'}}>
                <div className="col-12">
                  GERALMENTE VEM DwsE...
                </div>
                {
                   this.state.transporte.map((e, key)=>
                    <div className="col-12" key={key} style={{marginTop:'0.5em'}}>
                      {e}
                    </div>
                  )
                }
              </center>
          : null
          }
          <center className="row" style={{marginTop:'1em'}}>
            <div className="col-12">
              MAIORES BUSCAS
            </div>
          </center>
          <center>
            <div className="row" style={{marginTop:'1em'}}>
              <center className="col-4">
                <img src={CadeiranteIcon} alt={"Cadeirante Icon"} style={styles.prefIcons}/>
                <div style={styles.prefText}>Acomodação de Deficientes</div>
                <div style={styles.valorText}>{this.state.defic}%</div>
              </center>
              <center className="col-4">
                <img src={SmokingIcon} alt={"Fumante Icon"} style={styles.prefIcons}/>
                <div style={styles.prefText}>Aceitação de Fumantes</div>
                <div style={styles.valorText}>{this.state.fumante}%</div>
              </center>
              <center className="col-4">
                <img src={MusicIcon} alt={"Music Icon"} style={styles.prefIcons}/>
                <div style={styles.prefText}>Ouvintes de Muita Música</div>
                <div style={styles.valorText}>{this.state.music}%</div>
              </center>
            </div>
          </center>
        </div>
      </div>
    )
  }
}
