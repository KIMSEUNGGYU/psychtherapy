// tslint:disable-next-line
import { combineReducers } from "redux";
import { reducer as auth } from "client/modules/auth";

import history from "./history";
const createRootReducer = (_history) =>
    combineReducers({
        auth
    });

const rootReducer = createRootReducer(history);

export default rootReducer;
