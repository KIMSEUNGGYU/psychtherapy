import { call, put, takeLatest } from "redux-saga/effects";
import api_manager from "client/api-manager";
// import { history } from "client/store";
import { GET_USER } from "client/modules/user";

const PUT_CHARGE_POINT = "PUT_CHARGE_POINT";
const PUT_CHARGE_POINT_SUCCESS = "PUT_CHARGE_POINT_SUCCESS";
const PUT_CHARGE_POINT_FAILURE = "PUT_CHARGE_POINT_FAILURE";

const PUT_PURCHASE_POINT = "PUT_PURCHASE_POINT";
const PUT_PURCHASE_POINT_SUCCESS = "PUT_PURCHASE_POINT_SUCCESS";
const PUT_PURCHASE_POINT_FAILURE = "PUT_PURCHASE_POINT_FAILURE";

export const actions = {
    putChargePoint: (payload) => ({
        type: PUT_CHARGE_POINT,
        payload
    }),
    putPurchasePoint: (payload) => ({
        type: PUT_PURCHASE_POINT,
        payload
    })
};

export function reducer(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export const api = {
    putChargePoint: async (payload) => {
        return await api_manager.put("/point/charge", payload);
    },
    putPurchasePoint: async (payload) => {
        console.log(payload);
        return await api_manager.put("/point/purchase", payload);
    }
};

function* putChargePointFunc(action) {
    try {
        const { payload } = action;
        const res = yield call(api.putChargePoint, payload);
        if (res) {
            yield put({ type: PUT_CHARGE_POINT_SUCCESS });
            yield put({ type: GET_USER });
            alert("포인트 충전이 완료되었습니다");
        }
    } catch (e) {
        console.log(e);
    }
}

function* putPurchasePointFunc(action) {
    try {
        const { payload } = action;
        const res = yield call(api.putPurchasePoint, payload);
        if (res) {
            yield put({ type: PUT_PURCHASE_POINT_SUCCESS });
            yield put({ type: GET_USER });
            alert("상담 신청이 완료되었습니다");
        }
    } catch (e) {
        console.log(e);
    }
}

export function* saga() {
    yield takeLatest(PUT_CHARGE_POINT, putChargePointFunc);
    yield takeLatest(PUT_PURCHASE_POINT, putPurchasePointFunc);
}
