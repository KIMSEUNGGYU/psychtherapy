import { all, fork } from "redux-saga/effects";
import { saga as authSaga } from "client/modules/auth";
import { saga as adminSaga } from "client/modules/admin";
import { saga as userSaga } from "client/modules/user";
import { saga as partnersSaga } from "client/modules/partners";

export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(adminSaga),
        fork(userSaga),
        fork(partnersSaga)
    ]);
}
