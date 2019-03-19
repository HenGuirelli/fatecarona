import socketIOClient from 'socket.io-client'
import config from '../../../../config.json'

// TODO: tratamento de cache enquanto estiver sem conexão
class ChatBehavior {
    constructor(responseCallBack){
        this.cache = []
        this.socket = socketIOClient(config.endpoint)
        this.room = ''
        this.messages = []

        this._responseCallBack = responseCallBack
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

    isEmptyQueueMessages = () => {
        return this.messages.length === 0
    }

    connect = room => {
        this.room = room
        this.socket.on('connected', () => {
            this.socket.emit('room', room)
            this.socket.emit('get messages')
        })

        this.socket.on('get messages', this._responseCallBack)
    }
}

export default ChatBehavior