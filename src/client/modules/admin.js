import { call, put, takeEvery } from "redux-saga/effects";
import api_manager from "client/api-manager";

const GET_USERS = "GET_USERS";
const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "GET_USERS_FAILURE";

const GET_PARTNERS = "GET_PARTNERS";
const GET_PARTNERS_SUCCESS = "GET_PARTNERS_SUCCESS";
const GET_PARTNERS_FAILURE = "GET_PARTNERS_FAILURE";

export const actions = {
    getUsers: (payload) => ({
        type: GET_USERS,
        payload
    }),
    getUsersSuccess: (payload) => ({
        type: GET_USERS_SUCCESS,
        payload
    }),
    getUsersFailure: (payload) => ({
        type: GET_USERS_FAILURE,
        payload
    }),

    getPartners: (payload) => ({
        type: GET_PARTNERS,
        payload
    }),
    getPartnersSuccess: (payload) => ({
        type: GET_PARTNERS_SUCCESS,
        payload
    }),
    getPartnersFailure: (payload) => ({
        type: GET_PARTNERS_FAILURE,
        payload
    })
};

export function reducer(
    state = {
        users: [],
        usersTotal: 0,
        partners: [],
        partnersTotal: 0
    },
    action
) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                loading: true
            };
        case GET_USERS_SUCCESS:
            const { users, usersTotal } = action.payload;
            console.log(users, "users");
            return {
                ...state,
                users,
                usersTotal,
                loading: false
            };
        case GET_PARTNERS_SUCCESS:
            const { partners, partnersTotal } = action.payload;
            console.log(partners, "partners");
            return {
                ...state,
                partners,
                partnersTotal,
                loading: false
            };
        default:
            return state;
    }
}
export const api = {
    getUsers: async (payload) => {
        const { page, size } = payload;
        return await api_manager.get(`/admin/users?page=${page}&size=${size}`);
    },
    getPartners: async (payload) => {
        const { page, size, evaluate } = payload;
        return await api_manager.get(
            `/admin/partners?page=${page}&size=${size}&evaluate=${evaluate}`
        );
    }
};

function* getUsersFunc(action) {
    try {
        const { payload } = action;
        const res = yield call(api.getUsers, payload);
        if (res) {
            yield put({
                type: GET_USERS_SUCCESS,
                payload: {
                    users: res.result.users,
                    usersTotal: res.result.totalCount
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function* getPartnersFunc(action) {
    try {
        const { payload } = action;
        const res = yield call(api.getPartners, payload);
        if (res) {
            yield put({
                type: GET_PARTNERS_SUCCESS,
                payload: {
                    partners: res.result.partners,
                    partnersTotal: res.result.totalCount
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

export function* saga() {
    yield takeEvery(GET_USERS, getUsersFunc);
    yield takeEvery(GET_PARTNERS, getPartnersFunc);
}
