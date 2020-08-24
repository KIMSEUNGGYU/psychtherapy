import { call, put, takeEvery } from "redux-saga/effects";
import io from "socket.io-client";
import api_manager from "client/api-manager";
import { store } from "client/store";

const ENTER_ROOM = "ENTER_ROOM";
const ENTER_ROOM_SUCCESS = "ENTER_ROOM_SUCCESS";
const ENTER_ROOM_FAILURE = "ENTER_ROOM_FAILURE";

const UPDATE_ROOM = "UPDATE_ROOM";
const UPDATE_ROOM_SUCCESS = "UPDATE_ROOM_SUCCESS";

const SEND_MESSAGE = "SEND_MESSAGE";
const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";

export const actions = {
    enterRoom: (payload) => ({
        type: ENTER_ROOM,
        payload
    }),
    updateRoom: (payload) => ({
        type: UPDATE_ROOM,
        payload
    }),
    sendMessage: (payload) => ({
        type: SEND_MESSAGE,
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
    enterRoom: (payload) => {
        socket = io("http://15.164.52.189/", {
            query: payload
        });
        return new Promise((resolve, reject) => {
            socket.emit("enterRoom", payload);
            socket.once("room", (room) => {
                resolve(room);
                socket.on("room", (messages) => {
                    console.log(messages, "messages");
                    store.dispatch(actions.updateRoom(messages));
                });
            });
        });
    },
    sendMessage: (payload) => {
        return new Promise((resolve, reject) => {
            socket.emit("message", payload);
            socket.once("room", (message) => {
                resolve(message);
            });
        });
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

export function* saga() {
    yield takeEvery(ENTER_ROOM, enterRoomFunc);
    yield takeEvery(UPDATE_ROOM, updateRoomFunc);
    yield takeEvery(SEND_MESSAGE, sendMessageFunc);
}
