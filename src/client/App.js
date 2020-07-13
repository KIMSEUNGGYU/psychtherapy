import React, { Fragment } from "react";
import "client/app.scss";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { store, history } from "store";
import { LayerPopupContainer } from "lib/popup";
import { PublicRoute, PrivateRoute } from "utils/routes";

import {
    Header,
    Main,
    Services,
    Feature,
    Counselors,
    Footer
} from "client/components";

const App = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                {/* <PublicRoute exact path="/" component={Login} />
            <PrivateRoute path="/" component={Admin} /> */}
                <LayerPopupContainer {...props} />
            </Router>
        </Provider>
    );
};

export default App;
