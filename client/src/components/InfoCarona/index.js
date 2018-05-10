import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import styles from './styles'
import config from '../../config.json'

export default class InfoCarona extends Component {
  render() {
    const { carona } = this.props
    let dataLift = new Date(carona.dataCarona)
    let dataCarona = (("0" + dataLift.getDate()).slice(-2) + "/" + ("0" + (dataLift.getMonth() + 1)).slice(-2) +
        "/" + dataLift.getFullYear())
    let horaCarona = dataLift.toTimeString().substr(0, 8)
    return(
      <div className="row" style={styles.root}>
        <div className="col-3 col-xl-1">
          <Avatar
            src={carona.motorista.img ? config.endpoint + "/images/" + carona.motorista.img : ""}
            size={50}
          />
        </div>
        <div className="col-9 col-xl-11">
          <div>
            <span>{carona.motorista.apelido + " "}</span>oferecendo carona com
            <span>{" " + carona.veiculo.marca + " " + carona.veiculo.modelo + " "}</span>
            em {dataCarona} {carona.tipo} horário de encontro {horaCarona}
          </div>
        </div>
        <div className="row" style={{bottom: 0, width: '100%'}}>
          <div className="col-6">
            <input type="button" style={styles.btnL} className="btn btn-primary" value="EU QUERO" />
          </div>
          <div className="col-6">
            <input type="button" style={styles.btnR} className="btn btn-primary" value="ESPIAR MOTORISTA" />
          </div>
        </div>
      </div>
    )
  }
}
