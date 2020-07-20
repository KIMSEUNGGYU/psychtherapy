import React, { Fragment } from "react";
import { LayerPopup } from "client/libs/popup";

const LoginPopup = () => {
    const onClickJoin = () => {
        Popup.joinPopup({ className: "join" });
        LayerPopup.hide(this.props.layerKey);
    };
    return (
        <Fragment>
            <p className="title">로그인</p>
            <div className="input_box">
                <input type="text" placeholder="이메일 주소" />
            </div>
            <div className="input_box">
                <input type="text" placeholder="패스워드" />
            </div>
            <button className="login_btn">로그인</button>
            <div className="join_msg">
                계정이 없으신가요?{" "}
                <button className="join_btn" onClick={onClickJoin}>
                    가입하기
                </button>
            </div>
        </Fragment>
    );
};

export default LoginPopup;
