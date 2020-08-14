import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { LayerPopup } from "client/libs/popup";
import { Popup } from "client/components";
import { actions as authActions } from "client/modules/auth";

const LoginPopup = (props) => {
    const onClickJoin = () => {
        Popup.joinPopup({ className: "join" });
        LayerPopup.hide(props.layerKey);
    };

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const onSubmit = () => {
        const callbackFunc = () => {
            setLoginData({
                ...loginData,
                password: ""
            });
            LayerPopup.hide(props.layerKey);
        };
        const payload = {
            loginData,
            callbackFunc
        };
        props.login(payload);
    };

    const onKeyPress = (e) => {
        if (e.charCode === 13) {
            onSubmit();
        }
    };

    return (
        <Fragment>
            <p className="title">로그인</p>
            <div className="input_box">
                <input
                    type="text"
                    placeholder="이메일 주소"
                    name="email"
                    value={loginData.email}
                    onChange={onChange}
                />
            </div>
            <div className="input_box">
                <input
                    type="password"
                    placeholder="패스워드"
                    name="password"
                    value={loginData.password}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                />
            </div>
            <button
                className="login_btn"
                onClick={onSubmit}
                disabled={!loginData.email || !loginData.password}
            >
                로그인
            </button>
            {props.location.pathname !== "/admin" && (
                <div className="join_msg">
                    계정이 없으신가요?{" "}
                    <button className="join_btn" onClick={onClickJoin}>
                        가입하기
                    </button>
                </div>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (payload) => dispatch(authActions.login(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPopup);
