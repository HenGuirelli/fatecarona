import socketIOClient from 'socket.io-client'
import config from '../../../../config.json'

class ChatBehavior {
    constructor(){
        this.cache = []
        this.socket = socketIOClient(config.endpoint)
        this.room = ''
        this.messages = []
    }

    sendMessage = ({ email, message }) => {
        if (this.isEmptyQueueMessages()){
            this.socket.emit('send message', { email, message })
        }else{
            this.cache.push({ email, message })
        }
    }

    sendMessages = (array) => {
        array.forEach(message => this.sendMessage(message))
    }

    loadMessagesFrom = email => {

    }

    isEmptyQueueMessages = () => {
        return this.messages.length === 0
    }

    connect = room => {
        this.room = room
        this.socket.on('connected', () => {
            this.socket.emit('room', room)
        })
    }
}

export default ChatBehavior