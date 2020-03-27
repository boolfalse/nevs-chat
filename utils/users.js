
const users = [];

function userJoinsRoom(userId, username, room) {
    const user = { userId, username, room };
    users.push(user);

    return user;
}

function getUser(userId) {
    const user = users.find(user => userId === user.userId);

    return user;
}

function leaveUser(userId) {
    const index = users.findIndex(user => user.userId === userId);
    if (index === -1) {
        return false;
    } else {
        const user = users.splice(index, 1)[0];
        return user;
    }
}

function getRoomUsers(room) {
    const roomUsers = users.filter(user => room === user.room);

    return roomUsers;
}

module.exports = {
    userJoinsRoom,
    getUser,
    leaveUser,
    getRoomUsers
};
