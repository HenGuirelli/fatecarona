import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import config from '../../config.json'
import axios from 'axios'
import styles from './styles'
import { connect } from 'react-redux'

class Lift extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      loaded: false
    };
  }

  loadDriver = (motorista) =>{
    var name;
    axios.get(config.endpoint + "/members/" + motorista)
    .then(resultMotorista => {
      name = resultMotorista.data.nome
      name = name.substring(0, name.indexOf(" "));
      this.setState({
        loaded: true,
        name
      })
    })
  }


  getText = (name, caronista, data, tipo, status) =>{
    var text='';
    switch(status) {
      case 'pendente':{
        if (caronista)
          return text = "VOCÊ está aguardando resposta de " + name +" para carona em " + data+ ", " + tipo
        else
          return text = "VOCÊ está oferecendo carona em " + data+", " + tipo
      }
      case 'andamento':{
        if (caronista)
          return text = "VOCÊ vai pegar carona com " + name +" em " + data+ ", " + tipo
        else
          return text = "VOCÊ vai dar carona carona em " + data+", " + tipo
      }
      case 'historico':{
        if (caronista)
          return text = "VOCÊ pegou carona com " + name +" em " + data+ ", " + tipo
        else
          return text = "VOCÊ deu carona em " + data+", " + tipo
      }
      default:{return text}
    }
  }

  /*<div style={styles.textMargin}>
    <span>VOCÊ está aguardando resposta <br /> de </span>{infomotorista}
    <span> para carona em <br /></span>{dataCarona} {tipo}
  </div>
  :
  <div style={styles.textMargin}>
    <span>VOCÊ está oferecendo carona em </span> {dataCarona} {tipo}
  </div>*/

  render() {

    const { userData, infomotorista, caronista, data, tipo, status } = this.props
    if (!this.state.loaded) this.loadDriver(infomotorista)
    let dataLift = new Date(data)
    let dataCarona = (("0" + dataLift.getDate()).slice(-2) + "/" + ("0" + (dataLift.getMonth() + 1)).slice(-2) + "/" + dataLift.getFullYear())

    let text = this.getText(this.state.name, caronista, dataCarona, tipo, status)
    return(
        <div className="row" style={{marginTop:'1em'}}>
          <div className="col-2">
            <Avatar
              src={userData.img ? config.endpoint + "/images/" + userData.img : ""}
              size={50}
            />
          </div>
          <div className="col-8">
            <span style={styles.textMargin}>
              {text}
            </span>
          </div>
        </div>
    )
  }
}

export default connect(store => {
  return {
    user: store.user.user,
    userData: store.user.userData
  }
})(Lift)
