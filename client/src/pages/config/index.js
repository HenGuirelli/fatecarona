import React, { Component } from 'react'

export default class Config extends Component {
  render() {
    const { logOut } = this.props

    const styles = {
      button: {
        width: '90%',
        margin: '0 0 1em 0',
        backgroundColor: '#6E4D8B',
        color: '#fff',
        font: 'bold',
        cursor: 'pointer'
      },
      item: {
        padding: '1em',
        borderBottom: '1px solid #d6d6d6',
        cursor: 'pointer'
      }
    }

    return(
      <div className="pageBase">
        <div>
          <div style={styles.item}>
            <h4>Minha Conta</h4>
          </div>
          <div style={styles.item}>
            <h4>Segurança e privacidade</h4>
          </div>
          <div style={styles.item}>
            <h4>Notificações</h4>
          </div>
          <div style={styles.item}>
            <h4>Sobre o Fatecarona</h4>
          </div>
          <div style={styles.item}>
            <h4>Central de ajuda</h4>
          </div>
          <center style={{position: 'absolute', bottom: 0, width: '100%'}}>
            <input type="button" style={styles.button} className="btn" value="SAIR" onClick={logOut}/>
          </center>
        </div>
      </div>
    )
  }
}
