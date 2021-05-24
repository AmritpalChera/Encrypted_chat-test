const users = [];

//add user to chat
const userJoin = (id, username, room) => {
    const user = {id, username, room}
    users.push(user);
    console.log('USERS>>', users)
    return user
}

//finds the current user
const getCurrentUser = (id)=> users.find((user)=>user.id === id)

const userLeave = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
}

module.exports = {
    userJoin,
    userLeave,
    getCurrentUser,
}


