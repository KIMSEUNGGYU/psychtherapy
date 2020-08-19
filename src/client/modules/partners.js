import { call, put, takeEvery } from "redux-saga/effects";
import api_manager from "client/api-manager";

const GET_PARTNER = "GET_PARTNER";
const GET_PARTNER_SUCCESS = "GET_PARTNER_SUCCESS";
const GET_PARTNER_FAILURE = "GET_PARTNER_FAILURE";

const GET_PARTNERS = "GET_PARTNERS";
const GET_PARTNERS_SUCCESS = "GET_PARTNERS_SUCCESS";
const GET_PARTNERS_FAILURE = "GET_PARTNERS_FAILURE";

export const actions = {
    getPartner: (payload) => ({
        type: GET_PARTNER,
        payload
    }),
    getPartnerSuccess: (payload) => ({
        type: GET_PARTNER_SUCCESS,
        payload
    }),
    getPartnerFailure: (payload) => ({
        type: GET_PARTNER_FAILURE,
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
        partner: {},
        partners: [],
        partnersTotal: 0
    },
    action
) {
    switch (action.type) {
        case GET_PARTNER:
            return {
                ...state,
                loading: true
            };
        case GET_PARTNER_SUCCESS:
            const { partner } = action.payload;
            return {
                ...state,
                partner,
                loading: false
            };
        case GET_PARTNERS_SUCCESS:
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
    getPartner: async (payload) => {
        const { page, size } = payload;
        // return await api_manager.get(
        //     `/partner?page=${page}&size=${size}`
        // );
    },
    getPartners: async (payload) => {
        const { page, size, gender, level, certificate, keyword } = payload;
        return await api_manager.get(
            `/partner?page=1&size=15&gender=${gender}&level=${level}&certificate=${certificate}&keyword=${keyword}`
        );
    }
};

function* getPartnerFunc(action) {
    try {
        const { payload } = action;
        const res = yield call(api.getPartner, payload);
        if (res) {
            yield put({
                type: GET_PARTNER_SUCCESS,
                payload: {
                    partner: res.result.partner
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
    yield takeEvery(GET_PARTNER, getPartnerFunc);
    yield takeEvery(GET_PARTNERS, getPartnersFunc);
}
