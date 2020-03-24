
const socket = io();

socket.on('message', function (message) {
    console.log("MESSAGE: " + message);
});
