import React from "react";
import { connect } from "react-redux";
import "./Header.scss";
import { MdEmail, MdPhone, MdPerson, MdLock } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { history } from "client/store";
import { Popup } from "client/components";

const Header = (props) => {
    // [TO DO] token값으로 변경
    const { pathname } = history.location;
    const is_admin = pathname.includes("admin");
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
                    {is_admin ? (
                        <button className="logout-btn">
                            <GoSignOut />
                            로그아웃
                        </button>
                    ) : (
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
                    )}
                </div>
            </div>
            <div className="header_bottom">
                <div className="layout flex_box between">
                    <h1
                        className="logo"
                        onClick={() => {
                            return history.push("/");
                        }}
                    >
                        Be Simple
                    </h1>
                    <div className="nav_box">
                        <ul>
                            {is_admin ? (
                                <ul>
                                    <li className="active">
                                        <button>대기자 리스트</button>
                                    </li>
                                    <li>
                                        <button>상담사 리스트</button>
                                    </li>
                                    {/* <li>
                                        <button>정산</button>
                                    </li> */}
                                </ul>
                            ) : (
                                <ul>
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
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
