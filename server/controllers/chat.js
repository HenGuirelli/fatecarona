const http = require('http')

const ChatController = app => {
    const httpServer = http.createServer(app)
    const io = require('socket.io')(httpServer)

    io.on('connection', socket => {
		console.log('socket connectado ' + socket.id)
		socket.emit('connected')

		socket.on('room', room => {
			socket.join(room)
			socket.room = room
			console.log('criado room: ', room)
		})
		
		socket.on('send message', data => {
			io.to(socket.room).emit('message recived')
			console.log(data)
		})
	})


    return httpServer
}

exports.Chat = ChatController