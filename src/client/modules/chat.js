import { call, put, takeEvery } from "redux-saga/effects";
import io from "socket.io-client";
import api_manager from "client/api-manager";
import { store } from "client/store";

const ENTER_ROOM = "ENTER_ROOM";
const ENTER_ROOM_SUCCESS = "ENTER_ROOM_SUCCESS";

const UPDATE_ROOM = "UPDATE_ROOM";
const UPDATE_ROOM_SUCCESS = "UPDATE_ROOM_SUCCESS";

const LEAVE_ROOM = "LEAVE_ROOM";
const LEAVE_ROOM_SUCCESS = "LEAVE_ROOM_SUCCESS";

const SEND_MESSAGE = "SEND_MESSAGE";
const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";

const GET_ROOM = "GET_ROOM";
const GET_ROOM_SUCCESS = "GET_ROOM_SUCCESS";

export const actions = {
    enterRoom: payload => ({
        type: ENTER_ROOM,
        payload
    }),
    updateRoom: payload => ({
        type: UPDATE_ROOM,
        payload
    }),
    sendMessage: payload => ({
        type: SEND_MESSAGE,
        payload
    }),
    leaveRoom: () => ({
        type: LEAVE_ROOM
    }),
    getRoom: payload => ({
        type: GET_ROOM,
        payload
    })
};

export function reducer(
    state = {
        room: {
            messages: [],
            users: [],
            id: ""
        }
    },
    action
) {
    switch (action.type) {
        case ENTER_ROOM_SUCCESS:
            const { room } = action.payload;
            return {
                ...state,
                room
            };
        case GET_ROOM_SUCCESS:
        case UPDATE_ROOM_SUCCESS:
            const { messages } = action.payload;
            return {
                ...state,
                room: {
                    ...state.room,
                    messages
                }
            };
        default:
            return state;
    }
}

let socket;
export const sockets = {
    enterRoom: payload => {
        socket = io("http://" + window.location.hostname + "/", {
            query: payload
        });
        return new Promise((resolve, reject) => {
            socket.emit("enterRoom", payload);
            socket.once("room", room => {
                resolve(room);
                socket.on("room", messages => {
                    store.dispatch(actions.updateRoom(messages));
                });
            });
        });
    },
    sendMessage: payload => {
        return new Promise((resolve, reject) => {
            socket.emit("message", payload);
            socket.once("room", message => {
                resolve(message);
            });
        });
    },
    leaveRoom: () => {
        return new Promise((resolve, reject) => {
            socket.emit("leaveRoom");
            socket.off("room");
            resolve();
        });
    }
};

export const api = {
    getRoom: async payload => {
        const { roomId } = payload;
        return await api_manager.get(`/chat?roomId=${roomId}`);
    }
};

function* enterRoomFunc(action) {
    try {
        const { payload } = action;
        const res = yield call(sockets.enterRoom, payload);
        if (res) {
            yield put({
                type: ENTER_ROOM_SUCCESS,
                payload: {
                    room: res
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function* updateRoomFunc(action) {
    try {
        const { payload } = action;
        if (Array.isArray(payload)) {
            yield put({
                type: UPDATE_ROOM_SUCCESS,
                payload: {
                    messages: payload
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function* sendMessageFunc(action) {
    try {
        const { payload } = action;
        const res = yield call(sockets.sendMessage, payload);
        if (res) {
            yield put({
                type: SEND_MESSAGE_SUCCESS,
                payload: {
                    message: res.message
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function* leaveRoomFunc(action) {
    try {
        const res = yield call(sockets.leaveRoom);
        if (res) {
            yield put({
                type: LEAVE_ROOM_SUCCESS
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function* getRoomFunc(action) {
    const { payload } = action;
    console.log(payload);
    try {
        const res = yield call(api.getRoom, payload);
        if (res) {
            yield put({
                type: GET_ROOM_SUCCESS,
                payload: {
                    messages: res.result.contents
                }
            });
        } else {
            yield put({
                type: GET_ROOM_SUCCESS,
                payload: {
                    messages: []
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

export function* saga() {
    yield takeEvery(ENTER_ROOM, enterRoomFunc);
    yield takeEvery(UPDATE_ROOM, updateRoomFunc);
    yield takeEvery(LEAVE_ROOM, leaveRoomFunc);
    yield takeEvery(SEND_MESSAGE, sendMessageFunc);
    yield takeEvery(GET_ROOM, getRoomFunc);
}
