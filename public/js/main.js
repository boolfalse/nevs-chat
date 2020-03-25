
const chatForm = document.getElementById('chat-form');
const socket = io();
const chatMessages = document.querySelector('.chat-messages');

function scrollArea() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function refreshInput(event) {
    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();
}

function receiveMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p> <p class="text">${message.text}</p>`;
    chatMessages.appendChild(div);
}

socket.on('message', function (message) {
    receiveMessage(message);
    scrollArea();
});

chatForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const text = e.target.elements.msg.value;
    socket.emit('chatMessage', text);
    refreshInput(e);
});
