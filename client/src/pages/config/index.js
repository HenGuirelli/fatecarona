import React, { Component } from 'react'
import SimpleHeader from '../../components/SimpleHeader'

export default class Config extends Component {
  render() {
    const { logOut } = this.props

    const styles = {
      button1: {
        width: '90%',
        margin: '1em 0',
        backgroundColor: '#A8CF45'
      },
      button2: {
        width: '90%',
        margin: '0 0 1em 0',
        backgroundColor: '#6E4D8B',
        color: '#fff'
      }
    }

    return(
      <div className="pageBase">
        <SimpleHeader title="Configurações"/>
        <div>
          <div style={{padding: '1em', borderBottom: '1px solid #d6d6d6'}}>
            <h4>Serviços conectados:</h4>
          </div>
          <div style={{padding: '1em', borderBottom: '1px solid #d6d6d6'}}>
            <h4>Versão:</h4>
            Beta 1.0
          </div>
          <center style={{position: 'absolute', bottom: 0, width: '100%'}}>
            <input type="button" style={styles.button1} className="btn" value="Ajuda/suporte"/>
            <input type="button" style={styles.button2} className="btn" value="Logoff" onClick={logOut}/>
          </center>
        </div>
      </div>
    )
  }
}