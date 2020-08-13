import React, { useEffect } from "react";
import "client/app.scss";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { store, history } from "client/store";
import { LayerPopupContainer } from "client/libs/popup";
import { PublicRoute, PrivateRoute } from "client/others/routes";
import {
    PageHome,
    PageCounselors,
    PageCounselor,
    PageCounselingPayment,
    PageAdmin,
    PageScheduleManagement,
    PagePricing
} from "client/pages";
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
                <PublicRoute
                    exact
                    path="/counselors/:id"
                    component={PageCounselor}
                />
                <PublicRoute
                    exact
                    path="/counselors/:id/counseling_payment"
                    component={PageCounselingPayment}
                />
                <PublicRoute exact path="/pricing" component={PagePricing} />
                <PrivateRoute
                    path="/schedule_management"
                    component={PageScheduleManagement}
                />
                <PublicRoute exact path="/admin" component={PageAdmin} />
                <Footer />
                <LayerPopupContainer {...props} />
            </Router>
        </Provider>
    );
};

export default App;
