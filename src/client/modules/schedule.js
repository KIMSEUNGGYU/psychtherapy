import { call, put, takeLatest } from "redux-saga/effects";
import api_manager from "client/api-manager";
// import { history } from "client/store";

const GET_PARTNER_SCHEDULE_LIST = "GET_PARTNER_SCHEDULE_LIST";
const GET_PARTNER_SCHEDULE_LIST_SUCCESS = "GET__PARTNER_SCHEDULE_LIST_SUCCESS";
const GET_PARTNER_SCHEDULE_LIST_FAILURE = "GET_PARTNER_SCHEDULE_LIST_FAILURE";

const POST_PARTNER_SCHEDULE = "POST_PARTNER_SCHEDULE";
const POST_PARTNER_SCHEDULE_SUCCESS = "POST_PARTNER_SCHEDULE_SUCCESS";
const POST_PARTNER_SCHEDULE_FAILURE = "POST_PARTNER_SCHEDULE_FAILURE";

const DELETE_PARTNER_SCHEDULE = "DELETE_PARTNER_SCHEDULE";
const DELETE_PARTNER_SCHEDULE_SUCCESS = "DELETE_PARTNER_SCHEDULE_SUCCESS";
const DELETE_PARTNER_SCHEDULE_FAILURE = "DELETE_PARTNER_SCHEDULE_FAILURE";

export const actions = {
    getPartnerScheduleList: (payload) => ({
        type: GET_PARTNER_SCHEDULE_LIST,
        payload
    }),
    getPartnerScheduleListSuccess: (payload) => ({
        type: GET_PARTNER_SCHEDULE_LIST_SUCCESS,
        payload
    }),
    getPartnerScheduleListFailure: (payload) => ({
        type: GET_PARTNER_SCHEDULE_LIST_FAILURE,
        payload
    }),
    postPartnerSchedule: (payload) => ({
        type: POST_PARTNER_SCHEDULE,
        payload
    }),
    postPartnerScheduleSuccess: (payload) => ({
        type: POST_PARTNER_SCHEDULE_SUCCESS,
        payload
    }),
    postPartnerScheduleFailure: (payload) => ({
        type: POST_PARTNER_SCHEDULE_FAILURE,
        payload
    }),
    deletePartnerSchedule: (payload) => ({
        type: DELETE_PARTNER_SCHEDULE,
        payload
    }),
    deletePartnerScheduleSuccess: (payload) => ({
        type: DELETE_PARTNER_SCHEDULE_SUCCESS,
        payload
    }),
    deletePartnerScheduleFailure: (payload) => ({
        type: DELETE_PARTNER_SCHEDULE_FAILURE,
        payload
    })
};

export function reducer(
    state = {
        schedules: [],
        schedule: {
            scheduleId: 0,
            reservation: false,
            startedAt: ""
        }
    },
    action
) {
    switch (action.type) {
        case GET_PARTNER_SCHEDULE_LIST:
            return {
                ...state
            };
        case GET_PARTNER_SCHEDULE_LIST_SUCCESS:
            const { schedules } = action.payload;
            return {
                ...state,
                schedules
                //loading
            };
        case GET_PARTNER_SCHEDULE_LIST_FAILURE:
            return {
                ...state
            };
        default:
            return state;
    }
}

export const api = {
    getPartnerScheduleList: async (payload) => {
        const { partnerId, date } = payload;
        return await api_manager.get(`/schedule/${partnerId}/${date}`);
    },
    postPartnerSchedule: async (payload) => {
        return await api_manager.post("/schedule/partner", payload);
    },
    deletePartnerSchedule: async (payload) => {
        const { partnerId, scheduleId } = payload;
        return await api_manager.remove(
            `schedule/partner?partnerId=${partnerId}&scheduleId=${scheduleId}`,
            payload
        );
    }
};

function* getPartnerScheduleListFunc(action) {
    try {
        const { payload } = action;
        const res = yield call(api.getPartnerScheduleList, payload);
        if (res) {
            yield put({
                type: GET_PARTNER_SCHEDULE_LIST_SUCCESS,
                payload: {
                    schedules: res.result.schedules
                }
            });
        } else {
            yield put({
                type: GET_PARTNER_SCHEDULE_LIST_SUCCESS,
                payload: {
                    schedules: []
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function* postPartnerScheduleFunc(action) {
    const { partnerId, date } = action.payload;
    try {
        const res = yield call(api.postPartnerSchedule, action.payload);
        if (res) {
            alert("일정이 추가 되었습니다.");
            yield put({ type: GET_PARTNER_SCHEDULE_LIST, payload:{ partnerId, date }});
        }
    } catch (e) {
        console.log(e);
    }
}

function* deletePartnerScheduleFunc(action) {
    try {
        const payload = action.payload;
        console.log(action.payload, "delete");
        const res = yield call(api.deletePartnerSchedule, payload);
        if (res) {
            yield put({ type: DELETE_PARTNER_SCHEDULE_SUCCESS });
            alert("일정이 취소 되었습니다.");
        }
    } catch (e) {
        console.log(e);
    }
}

export function* saga() {
    yield takeLatest(GET_PARTNER_SCHEDULE_LIST, getPartnerScheduleListFunc);
    yield takeLatest(POST_PARTNER_SCHEDULE, postPartnerScheduleFunc);
    yield takeLatest(DELETE_PARTNER_SCHEDULE, deletePartnerScheduleFunc);
}