import { call, put, takeLatest } from "redux-saga/effects";
import api_manager from "client/api-manager";
// import { history } from "client/store";

const POST_USER = "POST_USER";
const POST_USER_SUCCESS = "POST_USER_SUCCESS";
const POST_USER_FAILURE = "POST_USER_FAILURE";

const POST_WAITER_USER = "POST_WAITER_USER";
const POST_WAITER_USER_SUCCESS = "POST_WAITER_USER_SUCCESS";
const POST_WAITER_USER_FAILURE = "POST_WAITER_USER_FAILURE";

const GET_USER_EMAIL_VALIDATE = "GET_USER_EMAIL_VALIDATE";
const GET_USER_EMAIL_VALIDATE_SUCCESS = "GET_USER_EMAIL_VALIDATE_SUCCESS";
const GET_USER_EMAIL_VALIDATE_FAILURE = "GET_USER_EMAIL_VALIDATE_FAILURE";

export const actions = {
    postUser: (payload) => ({
        type: POST_USER,
        payload
    }),
    postUserSuccess: (payload) => ({
        type: POST_USER_SUCCESS,
        payload
    }),
    postFailure: (payload) => ({
        type: POST_USER_FAILURE,
        payload
    }),
    postWaiterUser: (payload) => ({
        type: POST_WAITER_USER,
        payload
    }),
    postWaiterUserSuccess: (payload) => ({
        type: POST_WAITER_USER_SUCCESS,
        payload
    }),
    postWaiterUserFailure: (payload) => ({
        type: POST_WAITER_USER_FAILURE,
        payload
    }),
    getUserValidate: (payload) => ({
        type: GET_USER_EMAIL_VALIDATE,
        payload
    }),
    getUserValidateSuccess: (payload) => ({
        type: GET_USER_EMAIL_VALIDATE_SUCCESS,
        payload
    }),
    getUserValidateFailure: (payload) => ({
        type: GET_USER_EMAIL_VALIDATE_FAILURE,
        payload
    })
};

export function reducer(
    state = {
        emailForbidden: false
    },
    action
) {
    switch (action.type) {
        case GET_USER_EMAIL_VALIDATE:
            return {
                ...state
            };
        case GET_USER_EMAIL_VALIDATE_SUCCESS:
            return {
                ...state,
                emailForbidden: false
            };
        case GET_USER_EMAIL_VALIDATE_FAILURE:
            return {
                ...state,
                emailForbidden: true
            };
        default:
            return state;
    }
}

export const api = {
    postUser: async (payload) => {
        return await api_manager.post("/user/signup", payload);
    },
    postWaiterUser: async (payload) => {
        return await api_manager.post("/partner/signup", payload);
    },
    getUserValidate: async (payload) => {
        return await api_manager.get(
            `/user/email/validate?email=${payload}`,
            payload
        );
    }
};

function* postUserFunc(action) {
    try {
        const { joinData, callbackFunc } = action.payload;
        const res = yield call(api.postUser, joinData);
        if (res) {
            yield put({ type: POST_USER_SUCCESS, message: res.message });
            callbackFunc();
            alert("회원가입에 성공 하였습니다.");
        }
    } catch (e) {
        console.log(e);
    }
}

function* postWaiterUserFunc(action) {
    try {
        const { joinData, callbackFunc } = action.payload;
        const res = yield call(api.postWaiterUser, joinData);
        if (res) {
            yield put({ type: POST_WAITER_USER_SUCCESS, message: res.message });
            callbackFunc();
            alert("회원가입에 성공 하였습니다.");
        }
    } catch (e) {
        console.log(e);
    }
}

function* getUserValidateFunc(action) {
    try {
        const payload = action.payload;
        const res = yield call(api.getUserValidate, payload);
        if (res) {
            yield put({
                type: GET_USER_EMAIL_VALIDATE_SUCCESS,
                payload: { emailForbidden: false }
            });
            alert("사용 가능한 E-mail 입니다.");
        }
    } catch (e) {
        if (e.status === 409) {
            yield put({
                type: GET_USER_EMAIL_VALIDATE_FAILURE,
                payload: { emailForbidden: true }
            });
            alert("이미 사용중인 E-mail 입니다.");
        }
    }
}

export function* saga() {
    yield takeLatest(POST_USER, postUserFunc);
    yield takeLatest(POST_WAITER_USER, postWaiterUserFunc);
    yield takeLatest(GET_USER_EMAIL_VALIDATE, getUserValidateFunc);
}
