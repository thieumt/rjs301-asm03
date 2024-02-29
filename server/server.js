const express = require('express');
const io = require('socket.io');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// created io
io.createServer();

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    // all connect
    const users = io.sockets.clients();

    // send message to users
    users.forEach((user) => {
      user.emit('message', message);
    });
  });
});

app.listen(port, () => {
  console.log('App is running on port', port);
});

