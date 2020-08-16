// tslint:disable-next-line
import { combineReducers } from "redux";
import { reducer as auth } from "client/modules/auth";
import { reducer as admin } from "client/modules/admin";

import history from "./history";
const createRootReducer = (_history) =>
    combineReducers({
        auth,
        admin
    });

const rootReducer = createRootReducer(history);

export default rootReducer;
