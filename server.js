
const path = require('path');
const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);

app.use(express.static(path.join(__dirname, 'public')));

const port = 3000 || process.env.PORT;

io.on('connection', function (socket) {
    socket.emit('message', "Message for current user.");
    socket.broadcast.emit('message', "Someone else has connected.");
    // io.emit('message', "Message for all users including the current one.");

    socket.on('disconnect', function (socket) {
        io.emit('message', "Someone left the chat.");
    });
});

server.listen(port, function () {
    console.log("Server started on port " + port + " !!!");
});
