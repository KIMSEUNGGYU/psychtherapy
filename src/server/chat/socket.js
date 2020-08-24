const Room = require("./Room");

const socketHandler = (socket) => {
    const { id, user } = socket.handshake.query;

    socket.on("enterRoom", () => {
        const room = Room.enter({ id, user });
        if (room) {
            socket.join(room.id, () => {
                socket.emit("room", room);
                socket.to(room.id).emit("room", room);
            });
        }
    });

    socket.on("message", ({ id, content }) => {
        const messages = Room.message({ id, user, content });
        if (messages) {
            socket.emit("room", messages);
            socket.to(id).emit("room", messages);
        }
    });
};

module.exports = socketHandler;
