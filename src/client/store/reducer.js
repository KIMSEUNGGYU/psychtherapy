// tslint:disable-next-line
import { combineReducers } from "redux";
import { reducer as auth } from "client/modules/auth";
import { reducer as user } from "client/modules/user";

import history from "./history";
const createRootReducer = (_history) =>
    combineReducers({
        auth,
        user
    });

const rootReducer = createRootReducer(history);

export default rootReducer;
