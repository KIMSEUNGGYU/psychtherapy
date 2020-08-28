import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { actions as authActions } from "client/modules/auth";
import { getToken, parsingToken } from "client/others/token";
import { TICK_TIME } from "client/others/const";

let _sessionTimeout = 5;
export let sessionTimerID;

const RefreshToken = (props) => {
    useEffect(() => {
        const logout = () => {
            clearTimeoutFunc();
        };
        const setTimeoutFunc = () => {
            const sessionTimeout = _sessionTimeout * 1000 * 60;
            sessionTimerID = setTimeout(logout, sessionTimeout);
        };
        const resetTimeOut = () => {
            clearTimeoutFunc();
            setTimeoutFunc();
        };
        const tickCheck = () => {
            const token = getToken();
            if (!token) {
                return;
            }

            const sessionTime = parsingToken(token);
            const exp = sessionTime["exp"];
            const iat = sessionTime["iat"];
            const expTimestamp = +new Date(exp);
            const iatTimestamp = +new Date(iat);

            const date = new Date();
            const time = date.toISOString();
            const nowTime = time.substring(0, 19) + "Z";
            const nowTimestamp = +new Date(nowTime);

            if (nowTimestamp >= (expTimestamp + iatTimestamp) / 2) {
                // refresh token
                props.refreshToken();
            }
        };
        const events = ["load", "click", "scroll", "keypress"];
        for (let i in events) {
            window.addEventListener(events[i], resetTimeOut);
        }

        resetTimeOut();
        const timerID = setInterval(() => tickCheck(), TICK_TIME * 12);
        return () => {
            clearTimeoutFunc();
            clearInterval(timerID);
        };
    }, []);

    const clearTimeoutFunc = () => {
        if (sessionTimerID) {
            clearTimeout(sessionTimerID);
        }
    };
    return <Fragment />;
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshToken: () => dispatch(authActions.refreshToken())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RefreshToken);
