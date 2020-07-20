import React from "react";
import "./Header.scss";
import { MdEmail, MdPhone, MdPerson, MdLock } from "react-icons/md";
import { history } from "client/store";
import { Popup } from "client/components";

const Header = (props) => {
    const onClickLogin = () => {
        Popup.loginPopup({ className: "login" });
    };
    const onClickJoin = () => {
        Popup.joinPopup({ className: "join" });
    };
    const onClickCounselors = () => {
        history.push("/counselors");
    };
    return (
        <div className="header">
            <div className="header_top">
                <div className="layout flex_box between">
                    <div className="contacts">
                        <span className="first">
                            <MdEmail />
                            Support@google.com
                        </span>
                        <span>
                            <MdPhone />
                            +82 02-000-0000
                        </span>
                    </div>
                    <div className="login">
                        <span>
                            <MdPerson />{" "}
                            <button onClick={onClickLogin}>로그인</button>
                        </span>
                        <span>|</span>
                        <span className="last">
                            <MdLock />{" "}
                            <button onClick={onClickJoin}>회원가입</button>
                        </span>
                    </div>
                </div>
            </div>
            <div className="header_bottom">
                <div className="layout flex_box between">
                    <h1 className="logo" onClick={() => history.push("/")}>
                        Be Simple
                    </h1>
                    <div className="nav_box">
                        <ul>
                            <li>
                                <button></button>
                            </li>
                            <li className="active">
                                <button>홈</button>
                            </li>
                            <li>
                                <button>이용 가이드</button>
                            </li>
                            <li>
                                <button>요금 안내</button>
                            </li>
                            <li>
                                <button
                                    className="last_btn"
                                    onClick={onClickCounselors}
                                >
                                    나만의 상담사 찾기
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
