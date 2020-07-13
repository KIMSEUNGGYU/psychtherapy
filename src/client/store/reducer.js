// tslint:disable-next-line
import { combineReducers } from "redux";
// import { connectRouter } from "connected-react-router";
import history from "./history";
const createRootReducer = (_history) =>
    combineReducers({
        // router: connectRouter(_history),
    });

const rootReducer = createRootReducer(history);

export default rootReducer;
