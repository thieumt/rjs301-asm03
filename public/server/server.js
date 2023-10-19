const express = require('express');
const io = require('socket.io');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Khởi tạo đối tượng io
io.createServer();

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    // Tìm tất cả các người dùng khác đang kết nối
    const users = io.sockets.clients();

    // Gửi tin nhắn đến tất cả người dùng khác
    users.forEach((user) => {
      user.emit('message', message);
    });
  });
});

app.listen(port, () => {
  console.log('App is running on port', port);
});

// console.log("ĐMDMDMDMDM")
// console.log("Nhao vao di con")