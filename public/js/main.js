
const chatForm = document.getElementById('chat-form');
const socket = io();
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const roomUsers = document.getElementById('users');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

function scrollArea() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function refreshInput(event) {
    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();
}

function outputRoomName(room) {
    roomName.innerText = room;
}

function outputRoomUsers(users) {
    roomUsers.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}

function receiveMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p> <p class="text">${message.text}</p>`;
    chatMessages.appendChild(div);
}

socket.emit('joinRoom', { username, room });

socket.on('message', function (message) {
    receiveMessage(message);
    scrollArea();
});

socket.on('roomInfo', function ({ room, users }) {
    outputRoomName(room);
    outputRoomUsers(users);
});

chatForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const text = e.target.elements.msg.value;
    socket.emit('chatMessage', text);
    refreshInput(e);
});
