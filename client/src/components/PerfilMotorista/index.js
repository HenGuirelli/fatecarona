import React, { Component } from 'react'
import Avaliador from '../../components/Avaliador'
import { connect } from 'react-redux'
import InfoVeiculo from '../../components/InfoVeiculo'
import { loadCar } from '../../actions/carActions'
import config from '../../config.json'
import axios from 'axios'
class Motorista extends Component {
  constructor(props){
    super(props);
    this.state = {
      qtdCaronas: 0,
      loaded: false,
      avaliacaoLoaded: false,
      avaliacao: 0,
      qtdAvaliacoes: 0,
      fivestars: 0
    };
  }

  componentWillMount() {
    this.props.dispatch(loadCar(this.props.userEmail))
  }

  loadAvaliacao = () =>{
      let total = 0
      let somaStar = 0
      let fivestar=0
      axios.get(config.endpoint + "/avaliacao/" + this.props.userEmail)
      .then(result => {
        result.data.forEach((e, i) =>{
          if(e.motorista === 1){
            somaStar+= e.estrelas
            total++
          }
          if(e.fivestars === 1) fivestar++
        })
        if(total !== 0){
          somaStar /= total
          if (this.state.avaliacao === 0)
            this.setState({
              avaliacao: parseFloat(somaStar.toFixed(1)),
              qtdAvaliacoes: total,
              avaliacaoLoaded: true,
              fivestars: fivestar
            })
        }
      })
  }

  loadCarona = () => {
    axios.get(config.endpoint + "/lift/motorista/" + this.props.userEmail)
    .then(result =>{
      this.setState({
        loaded: true,
        qtdCaronas: result.data.length
      })
    })
  }


  render() {

    const styles = {
      root: {
        margin: '1em',
        padding: '1em',
      },
      descSize:{
        fontSize:'13px'
      },
      placaSize:{
        fontSize:'20px'
      },
      text:{
        fontSize: '28px',
        font: 'bold',
        textAlign: 'center'
      }
    }
    const { userEmail, veiculos, needLoad } = this.props


    if (needLoad) this.props.dispatch(loadCar(userEmail))
    if (!this.state.loaded && typeof this.props.userData.email !== "undefined") this.loadCarona()
    if (userEmail !== undefined && !this.state.avaliacao) this.loadAvaliacao()

    return(
      <div className="container">
        <div style={styles.content}>
          <div className="row">
            <div className="col-12">
              <Avaliador
                text="Avaliação"
                score={this.state.avaliacao}
              />
            </div>
          </div>
          <div className="row" style={{marginTop: '3em'}}>
              <center className="col-4">
                <div style={styles.text}>{this.state.qtdCaronas}</div>
                Caronas Realizadas
              </center>
              <center className="col-4">
                <div style={styles.text}>{this.state.qtdAvaliacoes}</div>
                Caronas Avaliadas
              </center>
              <center className="col-4">
                <div style={styles.text}>{this.state.fivestars}</div>
                Caronas 5 estrelas
              </center>
          </div>
          <div style={{marginTop: '40px'}}>
            <center><h4 style={{borderBottom: '1px solid #333', padding: '21px 0 21px 0'}}>VEÍCULOS ATIVOS</h4></center>
            <div className="row">
              {
              veiculos.length > 0 ?  veiculos.map((veiculo, key) =>
                <div key={key} className="col-md-6" style={{marginTop:'1.5em'}}>
                  {
                    veiculo.ativo === 1 ?
                      <InfoVeiculo
                        marca={veiculo.marca}
                        modelo={veiculo.modelo}
                        placa={veiculo.placa}
                      />
                    : null
                  }
                </div>
              )
              :
              <div>Não há veiculo ativo.</div>
              }
            </div>
          </div>
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
    needLoad: store.car.needLoad,
  }
})(Motorista)
