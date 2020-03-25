
const moment = require('moment');

function getTime() {
    return moment().format('M/d hh:mm');
}

function formatMessage(username, text) {
    const readyMessage = {
        username: username,
        text: text,
        time: getTime()
    };

    return readyMessage;
}

module.exports = formatMessage;
