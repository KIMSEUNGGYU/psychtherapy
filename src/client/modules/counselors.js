import { call, put, takeEvery } from "redux-saga/effects";
import api_manager from "client/api-manager";

const GET_PARTNERS = "GET_PARTNERS";
const GET_PARTNERS_SUCCESS = "GET_PARTNERS_SUCCESS";
const GET_PARTNERS_FAILURE = "GET_PARTNERS_FAILURE";

export const actions = {
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
        partners: [],
        total: 0,
        partner: {
            email: "",
            name: "",
            phoneNumber: "",
            gender: 1,
            age: 0,
            keyword: "우울",
            url: "",
            shortInfo: "",
            career: "",
            info: "",
            chatCost: 0,
            level: 1,
            certificate: 1,
            image: "",
            evaluate: false
        }
    },
    action
) {
    switch (action.type) {
        case GET_PARTNERS:
            return {
                ...state,
                loading: true
            };
        case GET_PARTNERS_SUCCESS:
            const { partnersData } = action;
            return {
                ...state,
                partnersData,
                loading: false
            };
        default:
            return state;
    }
}
export const api = {
    getChaincodes: async (payload) => {
        const { page, size, gender, level, certificate, keyword } = payload;
        return await api_manager.get(
            `/partner?page=${page}&size=${size}&gender=${gender}&level=${level}&certificate=${certificate}&keyword=${keyword}`
        );
    }
};

function* getPartnersFunc(action) {
    try {
        const { payload } = action;
        const res = yield call(api.getPartners, payload);
        if (res) {
            yield put({
                type: GET_PARTNERS_SUCCESS,
                partnersData: res
            });
        }
    } catch (e) {}
}

export function* saga() {
    yield takeEvery(GET_PARTNERS, getPartnersFunc);
}
