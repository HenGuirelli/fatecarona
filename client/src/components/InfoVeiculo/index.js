import React, { Component } from 'react'
import CarIcon  from '../Veiculo/veiculo_preto.png'

export default class InfoVeiculo extends Component {
  render() {
    const { marca, modelo, placa } = this.props
    return(
      <div >
        <div className="row">
          <div className="col-4" style={{paddingRight: '0', textAlign: 'right'}}>
            <img src={CarIcon} alt="..." style={{maxWidth: '74px', height: 'auto'}}/>
            <div>{placa}</div>
          </div>
          <div className="col-8">
            <div style={{fontSize: "15px"}}>{marca}, {modelo}</div>
            <div>Já fez 4 viagens</div>
          </div>
        </div>
      </div>
    )
  }
}
