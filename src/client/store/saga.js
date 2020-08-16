import { all, fork } from "redux-saga/effects";
import { saga as authSaga } from "client/modules/auth";
import { saga as adminSaga } from "client/modules/admin";

export default function* rootSaga() {
    yield all([fork(authSaga)]);
    yield all([fork(adminSaga)]);
}
