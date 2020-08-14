import { all, fork } from "redux-saga/effects";
import { saga as authSaga } from "client/modules/auth";

export default function* rootSaga() {
    yield all([fork(authSaga)]);
}
