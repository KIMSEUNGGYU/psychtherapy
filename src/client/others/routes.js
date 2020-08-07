import React from "react";
import { Route, Redirect } from "react-router";
import { getToken } from "client/others/token";

export const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                return getToken() ? (
                    <Redirect to="/" />
                ) : (
                    <Component {...props} />
                );
            }}
        />
    );
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                return getToken() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                );
            }}
        />
    );
};
