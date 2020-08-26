const Room = require("./Room");
const service = require("./service");

const socketHandler = socket => {
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

  const leaveRoomHandler = async () => {
    // 상담 내역 저장:Room.get({ id })로 user가 disconnection 되기 전의 room에 대한 정보를 가져온 뒤 저장
    const { users, messages } = Room.get({ id });

    const room = Room.leave({ user });

    // 메시지가 일부 갯수 이상일때만 저장하게 하기?
    // 저장은 맨 마지막 사람이 나갈때
    if (room && messages.length && users.length <= 0) {
      await service.insertRoomAndMessages(id, messages);

      socket.leave(room.id, () => {
        socket.to(room.id).emit("room", room);
      });
    } else {
      socket.leave(room.id, () => {
        socket.to(room.id).emit("room", room);
      });
    }
  };

  socket.on("leaveRoom", leaveRoomHandler);
  socket.on("disconnect", leaveRoomHandler);
};

module.exports = socketHandler;
