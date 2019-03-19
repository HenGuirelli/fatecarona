const http = require('http')

const ChatController = app => {
    const httpServer = http.createServer(app)
    const io = require('socket.io')(httpServer)

    io.on('connection', (socket) => {
        socket.emit('connected');
        // once a client has connected, we expect to get a ping from them saying what room they want to join
        socket.on('room', (room) => {
            socket.join(room);
            socket.room = room;
        });
        // when the client emits 'new message', this listens and executes
        socket.on('new message', message => {
          // we tell the clients to execute 'new message'
          io.to(socket.room).emit('new message', {
            username: socket.username,
            message
          });
        });
      
        // when the client emits 'add user', this listens and executes
        socket.on('add user', username => {
          // we store the username in the socket session for this client
          socket.username = username;
          socket.emit('login');
          // echo globally (all clients) that a person has connected
          io.to(socket.room).emit('user joined', {
            username: socket.username
          });
        });
      
        // when the client emits 'typing', we broadcast it to others
        socket.on('typing', () => {
          io.to(socket.room).emit('typing', {
            username: socket.username
          });
        });
      
        // when the client emits 'stop typing', we broadcast it to others
        socket.on('stop typing', () => {
          io.to(socket.room).emit('stop typing', {
            username: socket.username
          });
        });
      
        // when the user disconnects.. perform this
        socket.on('disconnect', () => {
          // echo globally that this client has left
          io.to(socket.room).emit('user left', {
            username: socket.username
          });
        });
      });

    return httpServer
}

exports.Chat = ChatController