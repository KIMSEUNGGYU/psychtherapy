import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import api_manager from "client/api-manager";
import { parsingToken } from "client/others/token";
import { history } from "client/store";

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";

const LOGOUT = "LOGOUT";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

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
                token:"",
                type:""
            }
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
                alert("Admin Login")
                history.push("/admin_users?page=1&size=25");
            }
            if (type === 0) {
                alert("Common User(Wait Parteners)Login")
            }
            if (type === 1) {
                alert("Partners Login")
                // history.push("/schedule_management/:partner_id")
            }
        }
    } catch (e) {}
}

function* logoutFunc() {
    try {
        yield put(localStorage.removeItem("refreshToken"),localStorage.removeItem("token"));
        if (!localStorage.getItem("token")) {
            yield put({ type: LOGOUT_SUCCESS});
            history.push("/");
        }
    } catch (e) {
    }
}

export function* saga() {
    yield takeEvery(LOGIN, loginFunc);
    yield takeLatest(LOGOUT, logoutFunc);
}
