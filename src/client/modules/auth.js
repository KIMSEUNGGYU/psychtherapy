import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import api_manager from "client/api-manager";
import { parsingToken } from "client/others/token";
import { history } from "client/store";

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";

const LOGOUT = "LOGOUT";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
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
    logout: () => ({
        type: LOGOUT
    }),
    logoutSuccess: () => ({
        type: LOGOUT_SUCCESS
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
        case LOGOUT_SUCCESS:
            return {
                ...state,
                token: "",
                type: ""
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
                alert("Admin Login");
                history.push("/admin_users?page=1&size=25");
            }
            if (type === 0) {
                alert("Common User Login");
            }
            if (type === 1) {
                alert("Partners Login");
            }
        }
    } catch (e) {
        if(e.status === 401 || e.statusText === "Unauthorized") {
            alert("아이디 혹은 패스워드를 확인해 주시기 바랍니다.")
        }
    }
}

function* logoutFunc() {
    try {
        yield put(
            localStorage.removeItem("refreshToken"),
            localStorage.removeItem("token")
        );
        if (!localStorage.getItem("token")) {
            yield put({ type: LOGOUT_SUCCESS });
            history.push("/");
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
    yield takeLatest(LOGOUT, logoutFunc);
    yield takeEvery(REFRESH_TOKEN, refreshTokenFunc);
}