// tslint:disable-next-line
import { combineReducers } from "redux";
import { reducer as auth } from "client/modules/auth";
import { reducer as user } from "client/modules/user";
import { reducer as admin } from "client/modules/admin";
import { reducer as partners } from "client/modules/partners";

import history from "./history";
const createRootReducer = (_history) =>
    combineReducers({
        auth,
        user,
        admin,
        partners
    });

const rootReducer = createRootReducer(history);

export default rootReducer;
