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
// const createSocketHandler = (io) => {
//     if (global.clearEmptyRoomsInterval)
//         clearInterval(global.clearEmptyRoomsInterval);
//     global.clearEmptyRoomsInterval = setInterval(() => {
//         Room.clearEmptyRooms();
//         io.to("ROOM_ID").emit("rooms", Room.instances);
//     }, 1000);

//     return function socketHandler(socket) {
//         console.log(socket.id, "id");
//         // 1: login (connected) -> emit logined with userData
//         const { nickname, avatarUrl } = socket.handshake.query;
//         const user = { id: socket.id, nickname, avatarUrl };
//         socket.emit("logined", { user });

//         // 2: enterLobby -> join LOBBY channel, and initially emit rooms with roomsData
//         socket.on("enterLobby", () => {
//             socket.join(LOBBY_ROOM_ID, () => {
//                 socket.emit("rooms", Room.instances);
//             });
//         });

//         // 2.5: leaveLobby -> leave LOBBY channel
//         socket.on("leaveLobby", () => {
//             socket.leave(LOBBY_ROOM_ID);
//         });

//         // 3: createRoom -> emit room with RoomData
//         socket.on("createRoom", ({ title }) => {
//             const room = Room.create({ title, user });
//             if (room) {
//                 socket.join(room.id, () => {
//                     socket.emit("room", room);
//                     socket.to(LOBBY_ROOM_ID).emit("rooms", Room.instances);
//                 });
//             }
//         });

//         // 4: enterRoom -> broadcast room with RoomData
//         socket.on("enterRoom", ({ id }) => {
//             const room = Room.enter({ id, user });
//             if (room) {
//                 socket.join(room.id, () => {
//                     socket.emit("room", room);
//                     socket.to(room.id).emit("room", room); // to other members
//                     socket.to(LOBBY_ROOM_ID).emit("rooms", Room.instances); // to lobby
//                 });
//             }
//         });

//         // 5: leaveRoom -> broadcast room with RoomData
//         const leaveRoomHandler = () => {
//             const room = Room.leave({ user });
//             if (room) {
//                 socket.leave(room.id, () => {
//                     socket.to(room.id).emit("room", room); // to other members
//                     socket.to(LOBBY_ROOM_ID).emit("rooms", Room.instances); // to lobby
//                 });
//             }
//         };

//         socket.on("leaveRoom", leaveRoomHandler);

//         // unexpected disconnection
//         socket.on("disconnect", leaveRoomHandler);

//         // 6: message -> broadcast room with RoomData (messages)
//         socket.on("message", ({ id, content }) => {
//             const message = Room.message({ id, user, content });
//             if (message) {
//                 const roomData = { message };
//                 socket.emit("room", roomData);
//                 socket.to(id).emit("room", roomData); // to other members
//             }
//         });
//     };
// };

// module.exports = createSocketHandler;
