import React from "react";
import { MdMailOutline, MdLockOutline } from "react-icons/md";

const LoginPopup = () => {
    return (
        <div className="login  center_box x y">
            <p className="title">이메일 로그인</p>
            <div className="input_box">
                <MdMailOutline />
                <input type="text" placeholder="이메일 주소" />
            </div>
            <div className="input_box">
                <MdLockOutline />
                <input type="text" placeholder="패스워드" />
            </div>
            <button className="login_btn">로그인</button>
        </div>
    );
};

export default LoginPopup;
