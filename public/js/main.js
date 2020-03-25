
const chatForm = document.getElementById('chat-form');
const socket = io();
const chatMessages = document.querySelector('.chat-messages');

function getTime() {
    const date = new Date();
    const time = (date.getMonth()+1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
    return time;
}

function scrollArea() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function refreshInput(event) {
    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();
}

function receiveMessage(message) {
    const time = getTime();
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Mary <span>${time}</span></p> <p class="text">${message}</p>`;
    chatMessages.appendChild(div);
}

socket.on('message', function (message) {
    receiveMessage(message);
    scrollArea();
});

chatForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const message = e.target.elements.msg.value;
    socket.emit('chatMessage', message);
    refreshInput(e);
});
