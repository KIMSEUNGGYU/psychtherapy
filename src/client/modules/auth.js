import { call, put, takeEvery } from "redux-saga/effects";
import api_manager from "client/api-manager";
import { parsingToken } from "client/others/token";
import { history } from "client/store";
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";

export const actions = {
    login: (payload) => ({
        type: LOGIN,
        payload
    }),
    loginSuccess: (payload) => ({
        type: LOGIN_SUCCESS,
        payload
    }),
    loginFailure: (payload) => ({
        type: LOGIN_FAILURE,
        payload
    })
};

export function reducer(
    state = {
        token: "",
        type: ""
    },
    action
) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loading: true
            };
        case LOGIN_SUCCESS:
            const { token, type } = action.payload;
            return {
                ...state,
                token,
                type
            };
        default:
            return state;
    }
}
export const api = {
    login: async (payload) => {
        return await api_manager.post("/user/signin", payload);
    }
};

function* loginFunc(action) {
    try {
        const { loginData, callbackFunc } = action.payload;
        const res = yield call(api.login, loginData);
        if (res) {
            const { accessToken, refreshToken } = res.result;
            const { type } = parsingToken(accessToken);
            yield put({
                type: LOGIN_SUCCESS,
                payload: { token: accessToken, type }
            });
            localStorage.setItem("token", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            callbackFunc();
            if (type === 99) {
                history.push("/admin_users?page=1&size=25");
            }
        }
    } catch (e) {}
}

export function* saga() {
    yield takeEvery(LOGIN, loginFunc);
}
