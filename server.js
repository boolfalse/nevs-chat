
const path = require('path');
const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;

io.on('connection', function (socket) {
    socket.on('disconnect', function (socket) {
        io.emit('message', formatMessage('John Doe', "Someone left the chat."));
    });
    socket.on('chatMessage', function (text) {
        io.emit('message', formatMessage('John Doe', text));
    });
});

server.listen(port, function () {
    console.log("Server started on port " + port + " !!!");
});
