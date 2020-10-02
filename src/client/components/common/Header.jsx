import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./Header.scss";
import { MdEmail, MdPhone, MdPerson, MdLock } from "react-icons/md";
import { getToken, getUserType,} from "client/others/token";
import { GoSignOut } from "react-icons/go";
import { Popup } from "client/components";
import { actions as userActions } from "client/modules/user";
import { actions as authActions } from "client/modules/auth";
import { history } from "client/store";

import useReactRouter from "use-react-router";

const Header = (props) => {
    const [is_admin, setIsAdmin] = useState(props.token && props.type === 99);
    const {
        location: { pathname }
    } = useReactRouter();
    const [loginFlag, setLoginFlag] = useState(false);

    // [TO DO] token값으로 변경
    useEffect(() => {
        const _is_admin = getToken() && getUserType() === 99;
        setIsAdmin(_is_admin);
        if(localStorage.getItem("token")) {
            setLoginFlag(true)
        }
        if(props.type === 0 ) {
            props.getUser(); 
        }
    }, [props.token, props.type]);

    const onClickLogin = () => {
        Popup.loginPopup({ className: "login" });
    };
    const onClickJoin = () => {
        Popup.joinPopup({ className: "join" });
    };
    const onClickLogout = () => {
        props.logout();
        setIsAdmin("");
        setLoginFlag(false)
        alert("로그아웃 되었습니다.")
        return history.push("/")
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
                    {loginFlag ? (
                    <div className="login">
                        <span>
                            <button className="logout-btn" onClick={onClickLogout}>
                                <GoSignOut />
                                로그아웃
                                </button>
                        </span>
                        <span>|</span>
                        <span className="last">
                         <button onClick={() =>
                            history.push("/detail")
                            }>
                             <MdPerson  />
                             마이페이지
                         </button>
                        </span>
                    </div>
                        
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
                                        <button
                                            onClick={() => {
                                                alert("TODO")
                                            }}>이용 가이드</button>
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
                                                    "/partners?page=1&size=25"
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
        type: state.auth.type,
        user: state.user.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (payload) => dispatch(userActions.getUser(payload)),
        logout:() => dispatch(authActions.logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
