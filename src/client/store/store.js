import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose, Store } from "redux";
import rootSaga from "./saga";
import rootReducer from "./reducer";
import history from "./history";
import { routerMiddleware } from "react-router-redux";
// import persistState from "redux-sessionstorage";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const appSagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);

const middlewares = [appSagaMiddleware, routeMiddleware];

if (process.env.NODE_ENV === "development") {
    // const { logger } = require("redux-logger");
    // middlewares.push(logger);
}

const store = createStore(
    rootReducer,
    composeEnhancer(
        // persistState(null, {
        //     slicer: () => (state) => {
        //         return {
        //             storage: state.storage
        //         };
        //     }
        // }),
        applyMiddleware(...middlewares)
    )
);

appSagaMiddleware.run(rootSaga);

if (process.env.NODE_ENV === `development`) {
    const unsubscribe = store.subscribe(() => {
        console.debug(store.getState());
    });

    unsubscribe();
}

export default store;
