import { call, put, takeEvery } from "redux-saga/effects";
import io from "socket.io-client";
import api_manager from "client/api-manager";

const POST_CHAT_USER = "POST_CHAT_USER";
const POST_CHAT_USER_SUCCESS = "POST_CHAT_USER_SUCCESS";
const POST_CHAT_USER_FAILURE = "POST_CHAT_USER_FAILURE";

const POST_ROOM = "POST_ROOM";
const POST_ROOM_SUCCESS = "POST_ROOM_SUCCESS";
const POST_ROOM_FAILURE = "POST_ROOM_FAILURE";

const GET_ROOMS = "GET_ROOMS";
const GET_ROOMS_SUCCESS = "GET_ROOMS_SUCCESS";
const GET_ROOMS_FAILURE = "GET_ROOMS_FAILURE";

const DELETE_ROOM = "DELETE_ROOM";
const DELETE_ROOM_SUCCESS = "DELETE_ROOM_SUCCESS";
const DELETE_ROOM_FAILURE = "DELETE_ROOM_FAILURE";

const GET_MESSAGES = "GET_MESSAGES";
const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS";
const GET_MESSAGES_FAILURE = "GET_MESSAGES_FAILURE";

const POST_MESSAGE = "POST_MESSAGE";
const POST_MESSAGE_SUCCESS = "POST_MESSAGE_SUCCESS";
const POST_MESSAGE_FAILURE = "POST_MESSAGE_FAILURE";

export const actions = {
    postChatUser: (payload) => ({
        type: POST_CHAT_USER,
        payload
    }),
    postChatUserSuccess: (payload) => ({
        type: POST_CHAT_USER_SUCCESS,
        payload
    }),
    postChatUserFailure: (payload) => ({
        type: POST_CHAT_USER_FAILURE,
        payload
    }),
    postRoom: (payload) => ({
        type: POST_ROOM,
        payload
    }),
    postRoomSuccess: (payload) => ({
        type: POST_ROOM_SUCCESS,
        payload
    }),
    postRoomFailure: (payload) => ({
        type: POST_ROOM_FAILURE,
        payload
    }),
    getRooms: (payload) => ({
        type: POST_ROOM,
        payload
    }),
    getRoomsSuccess: (payload) => ({
        type: GET_ROOMS_SUCCESS,
        payload
    }),
    getRoomsFailure: (payload) => ({
        type: GET_ROOMS_FAILURE,
        payload
    }),
    deleteRoom: (payload) => ({
        type: DELETE_ROOM,
        payload
    }),
    deleteRoomSuccess: (payload) => ({
        type: DELETE_ROOM_SUCCESS,
        payload
    }),
    deleteRoomFailure: (payload) => ({
        type: DELETE_ROOM_FAILURE,
        payload
    }),
    getMessages: (payload) => ({
        type: GET_MESSAGES,
        payload
    }),
    getMessagesSuccess: (payload) => ({
        type: GET_MESSAGES_SUCCESS,
        payload
    }),
    getMessagesFailure: (payload) => ({
        type: GET_MESSAGES_FAILURE,
        payload
    }),
    postMessage: (payload) => ({
        type: POST_MESSAGE,
        payload
    }),
    postMessageSuccess: (payload) => ({
        type: POST_MESSAGE_SUCCESS,
        payload
    }),
    postMessageFailure: (payload) => ({
        type: POST_MESSAGE_FAILURE,
        payload
    })
};

export function reducer(
    state = {
        activeRoom: false,
        rooms: [
            {
                id: 0,
                title: "",
                users: [
                    {
                        id: "",
                        name: ""
                    }
                ],
                messages: [
                    {
                        id: 0,
                        userId: "",
                        content: "",
                        at: ""
                    }
                ]
            }
        ]
    },
    action
) {
    switch (action.type) {
        case GET_ROOMS:
            return {
                ...state,
                loading: true
            };
        case GET_ROOMS_SUCCESS:
            const { partner } = action.payload;
            return {
                ...state,
                partner,
                loading: false
            };
        default:
            return state;
    }
}
// export const api = {
//     getRooms: async (payload) => {
//         const { id } = payload;
//         return await api_manager.get(`/partner/detail/${id}`);
//     }
// };

function* postChatUserFunc(action) {
    try {
        const { payload } = action;
        const socket = io.connect("http://localhost:8080/rooms");
        (() => {
            socket.on("news", (msg) => {
                console.log(msg, "????");
            });
        })();

        // _io.once("logined", (userData) => {
        //     console.log("logined", userData);
        //     this.state.setUser(userData);
        //     resolve(this.state.user);
        // });
        // const res = yield call(api.getRooms, io);
        // if (res) {
        //     yield put({
        //         type: GET_ROOMS_SUCCESS,
        //         payload: {
        //             partner: res.result.partner
        //         }
        //     });
        // }
    } catch (e) {
        console.log(e);
    }
}

export function* saga() {
    yield takeEvery(POST_CHAT_USER, postChatUserFunc);
}
