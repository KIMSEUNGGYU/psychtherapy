import { call, put, takeEvery } from "redux-saga/effects";
import api_manager from "client/api-manager";

const GET_USERS = "GET_USERS";
const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "GET_USERS_FAILURE";

const GET_ADMIN_PARTNERS = "GET_ADMIN_PARTNERS";
const GET_ADMIN_PARTNERS_SUCCESS = "GET_ADMIN_PARTNERS_SUCCESS";
const GET_ADMIN_PARTNERS_FAILURE = "GET_ADMIN_PARTNERS_FAILURE";

const PUT_PARTNER = "PUT_PARTNER";
const PUT_PARTNER_SUCCESS = "PUT_PARTNER_SUCCESS";
const PUT_PARTNER_FAILURE = "PUT_PARTNER_FAILURE";

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
        type: GET_ADMIN_PARTNERS,
        payload
    }),
    getPartnersSuccess: (payload) => ({
        type: GET_ADMIN_PARTNERS_SUCCESS,
        payload
    }),
    getPartnersFailure: (payload) => ({
        type: GET_ADMIN_PARTNERS_FAILURE,
        payload
    }),

    putPartner: (payload) => ({
        type: PUT_PARTNER,
        payload
    }),
    putPartnerSuccess: (payload) => ({
        type: PUT_PARTNER_SUCCESS,
        payload
    }),
    putPartnerFailure: (payload) => ({
        type: PUT_PARTNER_FAILURE,
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
        case GET_ADMIN_PARTNERS_SUCCESS:
            const { partners, partnersTotal } = action.payload;
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
    },
    putPartner: async (payload) => {
        return await api_manager.put(`/admin/partner/${payload.id}`, payload);
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
                type: GET_ADMIN_PARTNERS_SUCCESS,
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

function* putPartnerFunc(action) {
    try {
        const { callbackFunc, partnerData } = action.payload;
        const res = yield call(api.putPartner, partnerData);
        if (res) {
            alert("Success");
            callbackFunc();
        }
    } catch (e) {
        console.log(e);
    }
}

export function* saga() {
    yield takeEvery(GET_USERS, getUsersFunc);
    yield takeEvery(GET_ADMIN_PARTNERS, getPartnersFunc);
    yield takeEvery(PUT_PARTNER, putPartnerFunc);
}
