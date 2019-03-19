import React from 'react'
import './style.css'
import { connect } from 'react-redux'
import socketIOClient from "socket.io-client"
import config from '../../../../config.json'

class Chat extends React.Component {
    constructor(props){
        super(props)
        this.messages = []

        this.state = {
            socket: {},
            message: ''
        }
    }

    componentDidMount(){
        this.searchMessages()

        const socket = socketIOClient(config.endpoint);
        const { idSala, email } = this.props
        socket.on('connected', () => {
          socket.emit('room', idSala)
          socket.emit('add user', email)
        })
        socket.on('new message', (data) => {
        })
        this.setState({socket})
    }

    isEmptyQueueMessages = () => {
        return this.messages.length === 0
    }

    sendMessage = message => {
        //e.preventDefault()
        const { socket } = this.state
        if (message.length === 0) return
        socket.emit('new message', message)
        this.setState({message: ''})
    }

    // caso não tenha internet na hora
    sendMessages = () => {

    }

    // busca as mensagens antigas
    searchMessages = () => {

    }

    render(){

        return (
            <div className='chat'><button onClick={() => this.sendMessage('oi')}></button></div>
        )
    }
}

export default connect(store => {
    return {
        email: store.user.email,
        idSala: '10'
    }
})(Chat)