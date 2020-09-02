const moment = require("moment");

class Room {
  static instances = [];

  static create(args) {
    return new Room(args);
  }

  static enter({ id, user }) {
    const room = Room.instances.find(room => room.id === id);
    if (room) {
      if (!room.users.find(u => u.id === user)) {
        room.users.push(user);
      }
      return room;
    } else {
      const newRoom = Room.create({ id, user });
      return newRoom;
    }
  }

  static get({ id }) {
    const room = Room.instances.find(room => room.id === id);
    if (room) {
      return { ...room };
    }
  }

  static leave({ user }) {
    let userIndex = -1;
    const room = Room.instances.find(room => {
      userIndex = room.users.findIndex(u => u.id == user.id);
      return userIndex != -1;
    });
    if (room) {
      room.users.splice(userIndex, 1);
      return room;
    }
    return null;
  }

  static message({ id, user, content }) {
    const room = Room.instances.find(room => room.id === id);
    if (room) {
      const message = {
        id: (room.messages[room.messages.length - 1] || { id: 0 }).id + 1,
        user,
        content,
        at: moment().format("YYYY-MM-DD hh:mm A"),
      };
      room.messages = room.messages.slice(-9).concat(message);
      return room.messages;
    }
    return null;
  }

  constructor({ id, user }) {
    this.id = id;
    this.users = [user];
    this.messages = [];
    Room.instances.unshift(this);
  }
}

if (!global.ROOM_INSTANCES) {
  global.ROOM_INSTANCES = [];
}
Room.instances = global.global.ROOM_INSTANCES;

module.exports = Room;
