
const path = require('path');
const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoinsRoom, getUser, leaveUser } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;

io.on('connection', function (socket) {
    socket.on('joinRoom', function ({ username, room }) {
        const user = userJoinsRoom(socket.id, username, room);

        socket.join(user.room);

        socket.emit('message', formatMessage(user.username, `Welcome to the ${user.room}`));

        socket
            .broadcast
            .to(user.room) // emit for the specific room
            .emit('message', formatMessage(user.username, `${user.username} has joined to the chat!`));
    });

    socket.on('chatMessage', function (text) {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, text));
    });

    socket.on('disconnect', function () {
        const user = leaveUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', formatMessage(user.username, `${user.username} has left the chat!`));
        }
    });

});

server.listen(port, function () {
    console.log("Server started on port " + port + " !!!");
});
