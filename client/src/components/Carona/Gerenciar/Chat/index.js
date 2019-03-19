import React from 'react'
import './style.css'
import { connect } from 'react-redux'
import ChatBehavior from './chatBehavior'
import { withRouter } from 'react-router-dom'
import { OutlinedTextField } from '../../../Form/TextField'
import Button from '../../../Form/Button'
import Message from './Message';


const testsMessages = [
    { author: 'robson', message: 'oi', isYou: true },
    { author: 'rick', message: 'oi', isYou: false },
    { author: 'robson', message: 'coé', isYou: true },
    { author: 'rick', message: 'coé', isYou: false },
    { author: 'robson', message: 'oi', isYou: true },
    { author: 'rick', message: 'oi', isYou: false },
    { author: 'robson', message: 'coé', isYou: true },
    { author: 'rick', message: 'coé', isYou: false },
    { author: 'robson', message: 'oi', isYou: true },
    { author: 'rick', message: 'oi', isYou: false },
    { author: 'robson', message: 'coé', isYou: true },
    { author: 'rick', message: 'coé', isYou: false },
    { author: 'robson', message: 'oi', isYou: true },
    { author: 'rick', message: 'oi', isYou: false },
    { author: 'robson', message: 'coé', isYou: true },
    { author: 'rick', message: 'coé', isYou: false },
    { author: 'robson', message: 'oi', isYou: true },
    { author: 'rick', message: 'oi', isYou: false },
    { author: 'robson', message: 'coé', isYou: true },
    { author: 'rick', message: 'coé', isYou: false },
    { author: 'robson', message: 'oi', isYou: true },
    { author: 'rick', message: 'oi', isYou: false },
    { author: 'robson', message: 'coé', isYou: true },
    { author: 'rick', message: 'coé ultimo', isYou: false },
]

class Chat extends React.Component {
    constructor(props){
        super(props)
        this.chatBehavior = new ChatBehavior()

        this.state = {
            socket: {},
            message: '',
            messages: testsMessages
        }
    }

    handleChange = (event) => {
        this.setState({ message: event.target.value })
    }

    componentDidMount(){
        this.connect()
        this.searchMessages()
        this.refs.messagesArea.scrollTop =  this.refs.messagesArea.scrollHeight
    }

    connect = () => {
        const { carpoolId } = this.props.match.params
        this.chatBehavior.connect(carpoolId)
    }

    sendMessage = message => {
        const { email } = this.props
        this.chatBehavior.sendMessage({ email, message })
    }
   

    // busca as mensagens antigas
    searchMessages = () => {

    }

    render(){

        return (
            <div className='chat'>
                <div className='messages-area' ref='messagesArea' >
                    { this.state.messages.map(message => <Message { ...message } /> ) }
                </div>
                <div className='send-messages-area'>
                    <OutlinedTextField placeholder='Digite aqui...' onChange={this.handleChange} value={this.state.message} /> 
                    <Button className='btn-send-message' onClick={() => this.sendMessage(this.state.message)}> Enviar </Button>
                </div>
            </div>
        )
    }
}

export default connect(store => {
    return {
        email: store.user.email
    }
})(withRouter(Chat))