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

    const leaveRoomHandler = () => {
        // 상담 내역 저장:Room.get({ id })로 user가 disconnection 되기 전의 room에 대한 정보를 가져온 뒤 저장

        const room = Room.leave({ user });
        if (room) {
            socket.leave(room.id, () => {
                socket.to(room.id).emit("room", room);
            });
        }
    };

    socket.on("leaveRoom", leaveRoomHandler);
    socket.on("disconnect", leaveRoomHandler);
};

module.exports = socketHandler;
