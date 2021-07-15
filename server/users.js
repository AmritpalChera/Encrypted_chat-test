const users = [];
const rooms = [];
const crypto = require('crypto')

//add user to chat
const userJoin = (id, username, room) => {
    const found = rooms.some(el => el.roomname === room);
    if (!found) { 
        key = uuidv4();
        rooms.push({ roomname: room, roomkey: key });
    }
    const user = {id, username, room}
    users.push(user);
    console.log('USERS>>', users)
    return user
}

//finds the current user
const getCurrentUser = (id)=> users.find((user)=>user.id === id)

const getRoomKey = (room_name) => {
    let gotKey = rooms.find(x => x.roomname === room_name).roomkey;
    return gotKey;
}

const logRooms = () => console.log(rooms);

const userLeave = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
}

function uuidv4() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

module.exports = {
    userJoin,
    userLeave,
    getCurrentUser,
    getRoomKey,
    logRooms,
}


