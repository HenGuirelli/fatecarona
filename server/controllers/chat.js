const http = require('http')
const { GetMessage, SendMessage, GetProfile } = require('../DAO/mongo')

const ChatController = app => {
    const httpServer = http.createServer(app)
    const io = require('socket.io')(httpServer)

    io.on('connection', socket => {
		console.log('socket conectado')
		socket.emit('connected')

		socket.on('room', room => {
			socket.join(room)
			socket.room = room
			console.log('criado room: ', room)
		})
		
		socket.on('send message', data => {
			io.to(socket.room).emit('message recived')
			const email = data.email
			const text = data.message
			GetProfile(email)
			.then(result => {
				const data = result[0]
				// deletar o _id pq causa chave duplicada no mongo
				delete data._id
				SendMessage({ text, ...data,  room: socket.room })
				.then(_ => {
					GetMessage(socket.room)
					.then(result => {
						io.to(socket.room).emit('get messages', result)
					})
				})				
			}) 
		})

		socket.on('get messages', () => {
			GetMessage(socket.room)
			.then(result => {
				io.to(socket.room).emit('get messages', result)
			})
		})		
	})


    return httpServer
}

exports.Chat = ChatController