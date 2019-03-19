import React from 'react'
import './style.css'
import { connect } from 'react-redux'
import ChatBehavior from './chatBehavior'
import { withRouter } from 'react-router-dom'
import { OutlinedTextField } from '../../../Form/TextField'
import Button from '../../../Form/Button'
import Message from './Message';

class Chat extends React.Component {
    constructor(props){
        super(props)
        this.chatBehavior = new ChatBehavior(this.updateMessages)

        this.state = {
            socket: {},
            message: '',
            messages: []
        }
    }

    handleChange = (event) => {
        this.setState({ message: event.target.value })
    }

    componentDidMount(){
        this.connect()
        this.adjustScrool()
    }

    adjustScrool = () => {        
        this.refs.messagesArea.scrollTop =  this.refs.messagesArea.scrollHeight
    }

    connect = () => {
        const { carpoolId } = this.props.match.params
        this.chatBehavior.connect(carpoolId)
    }

    sendMessage = message => {
        const { email } = this.props
        this.chatBehavior.sendMessage({ email, message })
        this.setState({ message: '' })
    }

    updateMessages = messages => {
        console.log('response: ', messages)
        this.setState({ messages })
        this.adjustScrool()
    }

    fetchMessages = () => {
        return this.state.messages.map(message => ({ ...message, isYou: message.email === this.props.email  }))
    }

    render(){

        return (
            <div className='chat'>
                <div className='messages-area' ref='messagesArea' >
                    { this.fetchMessages().map(message => <Message { ...message } /> ) }
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