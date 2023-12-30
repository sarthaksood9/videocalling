const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const users = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    users[socket.id] = roomId;

    // Notify other users in the room about the new connection
    socket.to(roomId).broadcast.emit('user-connected', socket.id);

    socket.on('signal', ({ userId, data }) => {
      // Relay the signal to the specific user in the room
      io.to(userId).emit('signal', { userId: socket.id, data });
    });

    socket.on('disconnect', () => {
      // Notify other users in the room about the disconnection
      socket.to(roomId).broadcast.emit('user-disconnected', socket.id);
      delete users[socket.id];
    });
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});