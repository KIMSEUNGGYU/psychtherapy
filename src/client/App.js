import React from "react";
import "client/app.scss";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { store, history } from "client/store";
import { LayerPopupContainer } from "client/libs/popup";
import { PublicRoute } from "client/others/routes";
import { PageHome, PageCounselors, PageAdmin } from "client/pages";
import { Header, Footer } from "client/components";

const App = (props) => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Header {...props} />
                <PublicRoute exact path="/" component={PageHome} />
                <PublicRoute
                    exact
                    path="/counselors"
                    component={PageCounselors}
                />
                <PublicRoute exact path="/admin" component={PageAdmin} />
                <Footer />
                <LayerPopupContainer {...props} />
            </Router>
        </Provider>
    );
};

export default App;
