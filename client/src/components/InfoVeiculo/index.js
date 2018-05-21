import React, { Component } from 'react'
import CarIcon  from '../Veiculo/veiculo_preto.png'

export default class InfoVeiculo extends Component {
  render() {
    return(
      <div style={{borderTop: '1px solid #333', padding: '21px 0 21px 0'}}>
        <div className="row">
          <div className="col-4" style={{paddingRight: '0', textAlign: 'right'}}>
            <img src={CarIcon} alt="..." style={{maxWidth: '74px', height: 'auto'}}/>
            <div>AAA-1111</div>
          </div>
          <div className="col-8">
            <div style={{fontSize: "15px"}}>PAJERO FULL, MITSUBISHI</div>
            <div>
              <img className="img-fluid" style={{maxWidth: '28px'}} src={require('./passageiro.png')} alt="..."/>
              4 lugares
            </div>
            <div>Já fez 4 viagens</div>
          </div>
        </div>
      </div>
    )
  }
}
