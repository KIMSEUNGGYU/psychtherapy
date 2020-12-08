// tslint:disable-next-line
import { combineReducers } from "redux";
import { reducer as auth } from "client/modules/auth";
import { reducer as user } from "client/modules/user";
import { reducer as admin } from "client/modules/admin";
import { reducer as partners } from "client/modules/partners";
import { reducer as schedule } from "client/modules/schedule2";
import { reducer as chat } from "client/modules/chat";

import history from "./history";

const createRootReducer = (_history) =>
    combineReducers({
        auth,
        user,
        admin,
        partners,
        schedule,
        chat
    });

const rootReducer = createRootReducer(history);

export default rootReducer;
