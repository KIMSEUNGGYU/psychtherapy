// tslint:disable-next-line
import { combineReducers } from "redux";
import { reducer as auth } from "client/modules/auth";
import { reducer as user } from "client/modules/user";
import { reducer as admin } from "client/modules/admin";
import { reducer as counselors } from "client/modules/counselors";

import history from "./history";
const createRootReducer = (_history) =>
    combineReducers({
        auth,
        user,
        admin,
        counselors
    });

const rootReducer = createRootReducer(history);

export default rootReducer;
