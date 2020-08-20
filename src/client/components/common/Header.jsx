import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./Header.scss";
import { MdEmail, MdPhone, MdPerson, MdLock } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { history } from "client/store";
import { Popup } from "client/components";
import useReactRouter from "use-react-router";

const Header = (props) => {
    const {
        location: { pathname }
    } = useReactRouter();

    // [TO DO] token값으로 변경
    const is_admin = props.token && props.type === 99;

    const onClickLogin = () => {
        Popup.loginPopup({ className: "login" });
    };
    const onClickJoin = () => {
        Popup.joinPopup({ className: "join" });
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
                    {/* [TO DO] logout처리 */}
                    {is_admin ? (
                        <button
                            className="logout-btn"
                            onClick={() => localStorage.removeItem("token")}
                        >
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
                                    <li
                                        className={`${
                                            pathname.includes("admin_users") &&
                                            "active"
                                        }`}
                                    >
                                        <button
                                            onClick={() =>
                                                history.push(
                                                    "/admin_users?page=1&size=25"
                                                )
                                            }
                                        >
                                            피상담자 리스트
                                        </button>
                                    </li>
                                    <li
                                        className={`${
                                            pathname.includes(
                                                "admin_waiters"
                                            ) && "active"
                                        }`}
                                    >
                                        <button
                                            onClick={() =>
                                                history.push(
                                                    "/admin_waiters?page=1&size=25"
                                                )
                                            }
                                        >
                                            대기자 리스트
                                        </button>
                                    </li>
                                    <li
                                        className={`${
                                            pathname.includes(
                                                "admin_partners"
                                            ) && "active"
                                        }`}
                                    >
                                        <button
                                            onClick={() =>
                                                history.push(
                                                    "/admin_partners?page=1&size=25"
                                                )
                                            }
                                        >
                                            상담사 리스트
                                        </button>
                                    </li>
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
                                        <button
                                            onClick={() =>
                                                history.push("/pricing")
                                            }
                                        >
                                            요금 안내
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="last_btn"
                                            onClick={() =>
                                                history.push(
                                                    "/partners?page=1&size=25&gender=1&level=1&certificate=1&keyword=우울"
                                                )
                                            }
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
    return {
        token: state.auth.token,
        type: state.auth.type
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
