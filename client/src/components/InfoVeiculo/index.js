import React, { Component } from 'react'
import CarIcon  from '../Veiculo/veiculo_preto.png'

export default class InfoVeiculo extends Component {
  render() {
    const { marca, modelo, placa, viagens } = this.props
    return(
      <div >
        <div className="row">
          <div className="col-6" style={{paddingRight: '0', textAlign: 'right'}}>
            <img src={CarIcon} alt="..." style={{maxWidth: '74px', height: 'auto'}}/>
            <div>{placa}</div>
          </div>
          <div className="col-6">
            <div style={{fontSize: "15px"}}>{marca}, {modelo}</div>
            <div>Já fez {viagens} viagens</div>
          </div>
        </div>
      </div>
    )
  }
}
