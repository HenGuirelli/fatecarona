import React, { Component } from 'react'
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux'
import config from '../../config.json'
import styles from './styles'

class SocketIOChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      FADE_TIME: 150, // ms
      TYPING_TIMER_LENGTH: 400, // ms
      COLORS: [
        '#e21400', '#91580f', '#f8a700', '#f78b00',
        '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
        '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
      ],
      message: '',
      socket: {},
      log: []
    }
  }

  handleMessage = event => {
    this.setState({message: event.target.value})
  }

  sendMessage = (e) => {
    e.preventDefault()
    const { message, socket } = this.state
    if (message.length === 0) return
    socket.emit('new message', message)
    this.setState({message: ''})
  }

  componentDidMount() {
    const socket = socketIOClient(config.endpoint);
    const { userData, idSala } = this.props
    socket.on('connected', () => {
      socket.emit('room', idSala)
      socket.emit('add user', userData.apelido)
    })
    socket.on('new message', (data) => {
      const { log } = this.state
      log.push({user: data.username, text: data.message})
      this.setState({log})
    })
    this.setState({socket})
  }

  render() {
    const { log } = this.state
    const { userData } = this.props
    return(
      <form onSubmit={this.sendMessage} style={{width: '100%', marginBottom: '25px'}}>
        <div style={styles.container}>
          {log.map((e, key) => {
            if (e.user === userData.apelido) {
              return <div key={key} style={styles.textOwnItem}>
                <span>{e.msg}</span>
              </div>
            }
            return <div key={key} style={styles.textItem}>
              <div style={{color: 'red'}}>{e.user + ": "}</div>
              <div>{e.msg}</div>
            </div>
          }).reverse()}
        </div>
        <div className="input-group" style={{margin: '5px'}}>
          <input
            style={styles.textBox}
            placeholder="Digite aqui..."
            onChange={this.handleMessage}
            value={this.state.message}
            className="form-control"
          />
          <div className="input-group-append">
            <button className="btn btnChat" type="submit">Enviar</button>
          </div>
        </div>
      </form>
    )
  }
}

export default connect(store => {
  return {
    userData: store.user.userData,
  }
})(SocketIOChat)
