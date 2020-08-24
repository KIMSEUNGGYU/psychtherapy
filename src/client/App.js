import React, { useEffect } from "react";
import "client/app.scss";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { store, history } from "client/store";
import { LayerPopupContainer } from "client/libs/popup";
import {
    PublicRoute,
    PrivateRoute,
    AdminPrivateRoute
} from "client/others/routes";
import {
    PageHome,
    PageCounselors,
    PageCounselor,
    PageCounselingPayment,
    PageAdminUsers,
    PageAdminPartners,
    PageAdminWaiters,
    PageScheduleManagement,
    PagePricing
} from "client/pages";
import { Header, Footer, ChatTest } from "client/components";

const App = (props) => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Header {...props} />
                <PublicRoute exact path="/" component={PageHome} />
                <PublicRoute
                    exact
                    path="/partners"
                    component={PageCounselors}
                />
                <PublicRoute
                    exact
                    path="/partners/:prev_search/:id"
                    component={PageCounselor}
                />
                <PublicRoute
                    exact
                    path="counseling_payment"
                    component={PageCounselingPayment}
                />
                <PublicRoute exact path="/pricing" component={PagePricing} />
                <PrivateRoute
                    exact
                    path="/partners/:id/schedule_management"
                    component={PageScheduleManagement}
                />
                <AdminPrivateRoute
                    exact
                    path="/admin_users"
                    component={PageAdminUsers}
                />
                <AdminPrivateRoute
                    exact
                    path="/admin_waiters"
                    component={PageAdminWaiters}
                />
                <AdminPrivateRoute
                    exact
                    path="/admin_partners"
                    component={PageAdminPartners}
                />
                <Footer />
                <ChatTest {...props} />
                <LayerPopupContainer {...props} />
            </Router>
        </Provider>
    );
};

export default App;
