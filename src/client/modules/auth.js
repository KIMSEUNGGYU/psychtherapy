import { call, put, takeEvery } from "redux-saga/effects";
import api_manager from "client/api-manager";
import { parsingToken } from "client/others/token";
import { history } from "client/store";

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";

const REFRESH_TOKEN = "REFRESH_TOKEN";
const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";

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
    }),
    refreshToken: () => ({
        type: REFRESH_TOKEN
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
    },
    refreshToken: async () => {
        return await api_manager.put("/token/refresh");
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

function* refreshTokenFunc(action) {
    try {
        const res = yield call(api.refreshToken);
        if (res) {
            const { accessToken, refreshToken } = res.result;
            console.log(accessToken, refreshToken, "res");
            const { type } = parsingToken(accessToken);
            yield put({
                type: REFRESH_TOKEN_SUCCESS,
                payload: { token: accessToken, type }
            });
            localStorage.setItem("token", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
        }
    } catch (e) {
        console.log(e);
    }
}

export function* saga() {
    yield takeEvery(LOGIN, loginFunc);
    yield takeEvery(REFRESH_TOKEN, refreshTokenFunc);
}
