import React from "react";
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
    PagePricing,
    PageDetail,
    PageChat
} from "client/pages";
import { Header, Footer, RefreshToken } from "client/components";

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
                    path="/partners/:prev_search/:partner_id"
                    component={PageCounselor}
                />
                <PublicRoute
                    exact
                    path="counseling_payment"
                    component={PageCounselingPayment}
                />
                <PublicRoute exact path="/pricing" component={PagePricing} />
                <PrivateRoute exact path="/detail" component={PageDetail} />
                <PrivateRoute
                    exact
                    path="/schedule_management/:partner_id"
                    component={PageScheduleManagement}
                />
                <PrivateRoute
                    exact
                    path="/chat/:room_id/:user_id"
                    component={PageChat}
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
                {/* <Chat {...props} /> */}
                <RefreshToken />
                <LayerPopupContainer {...props} />
            </Router>
        </Provider>
    );
};

export default App;
