import React, { Component } from 'react'

export default class InfoVeiculo extends Component {
  render() {
    return(
      <div className="container" style={{borderBottom: '1px solid #333', marginTop: '21px', paddingBottom: '21px'}}>
        <div className="row">
          <div className="col-4">
            <div>AAA-1111</div>
          </div>
          <div className="col-8">
            <div>PAJERO FULL, MITSUBISHI</div>
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
