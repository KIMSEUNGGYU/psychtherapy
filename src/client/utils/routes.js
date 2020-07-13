import React from "react";
import { Route, Redirect } from "react-router";
import { getToken } from "client/utils/token";

export const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                getToken() ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    );
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                getToken() ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
};
