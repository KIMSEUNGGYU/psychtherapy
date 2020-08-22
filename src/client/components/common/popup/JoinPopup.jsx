import React, { Fragment, useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import {
    EmailValuePatternMatch,
    PasswordValuePatternMatch,
    PhoneNumberPatternMatch
} from "client/others/utils";
import { LayerPopup } from "client/libs/popup";
import { connect } from "react-redux";
import { actions as userActions } from "client/modules/user";

const JoinPopup = (props) => {
    const [activeTab, setActiveTab] = useState(0);
    const [toggle, setToggle] = useState(true);
    const onClickTab = (tabId) => {
        setActiveTab(tabId);
    };
    const [genderValue, setGenderValue] = useState(1);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [inputError, setInputError] = useState({
        errorMessage: "",
        inputStyle: ""
    });

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const onChangeRadio = (e) => {
        setGenderValue(e.target.value);
    };

    useEffect(() => {
        // gender 1 = Man
        if (genderValue === "1") {
            setJoinData({
                ...joinData,
                gender: Number("1")
            });
        }
        // gender 2 = Woman
        if (genderValue === "2") {
            setJoinData({
                ...joinData,
                gender: Number("2")
            });
        }
    }, [genderValue]);

    const onClickToggle = () => {
        setToggle(!toggle);
    };

    const onSubmitEmailForbbiden = () => {
        if (EmailForbidenValidation() === false) {
            return;
        }
        const payload = joinData.email;
        props.getUserValidate(payload);
    };

    const [joinData, setJoinData] = useState({
        email: "",
        password: "",
        name: "",
        phoneNumber: "",
        gender: "",
        age: ""
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setJoinData({
            ...joinData,
            [name]: value
        });
    };

    const onSubmit = () => {
        const callbackFunc = () => {
            LayerPopup.hide(props.layerKey);
        };
        if (activeTab === 0) {
            //activeTab === 0 Common User
            if (handleValidation() === false) {
                return;
            }
            delete joinData.phoneNumber;

            props.postUser({ joinData, callbackFunc });
        }
        if (activeTab === 1) {
            //activeTab === 1 Partners
            if (handleValidation() === false) {
                return;
            }
            props.postWaiterUser({ joinData, callbackFunc });
        }
    };

    const EmailForbidenValidation = () => {
        if (!EmailValuePatternMatch(joinData.email)) {
            setInputError({
                errorMessage: "E-mail 형식이 잘못되었습니다.",
                inputStyle: "email"
            });
            alert("E-mail 형식이 잘못되었습니다.");
            return false;
        }
        setInputError({
            errorMessage: "",
            inputStyle: ""
        });
        return true;
    };

    const handleValidation = () => {
        //Email value check
        if (!EmailValuePatternMatch(joinData.email)) {
            setInputError({
                errorMessage: "E-mail 형식이 잘못되었습니다.",
                inputStyle: "email"
            });
            alert("E-mail 형식이 잘못되었습니다.");
            return false;
        }

        // Password value check
        if (!PasswordValuePatternMatch(joinData.password)) {
            setInputError({
                errorMessage:
                    "암호는 한 개 이상의 숫자, 특수문자, 영문 소문자, 대문자가 포함되어야 합니다. 길이는 8자 이상이어야 합니다.",
                inputStyle: "password"
            });
            alert(
                "암호는 한 개 이상의 숫자, 특수문자, 영문 소문자, 대문자가 포함되어야 합니다. 길이는 8자 이상이어야 합니다."
            );
            return false;
        }
        if (joinData.password !== confirmPassword) {
            setInputError({
                errorMessage: "비밀번호가 동일하지 않습니다.",
                inputStyle: "password"
            });
            alert("비밀번호가 동일하지 않습니다.");
            return false;
        }

        //Phone num value check
        if (activeTab === 1 && !PhoneNumberPatternMatch(joinData.phoneNumber)) {
            setInputError({
                errorMessage: "전화번호 형식이 잘못되었습니다.",
                inputStyle: "phoneNumber"
            });
            alert("전화번호 형식이 잘못되었습니다.");
            return false;
        }
        setInputError({
            errorMessage: "",
            inputStyle: ""
        });
        return true;
    };

    return (
        <Fragment>
            <p className="title">회원가입</p>
            <div className="tab_box">
                <div className="tab_btn_box">
                    <button
                        className={`tab_btn ${activeTab === 0 && "active"}`}
                        onClick={() => {
                            return onClickTab(0);
                        }}
                    >
                        일반
                    </button>
                    <button
                        className={`tab_btn ${activeTab === 1 && "active"}`}
                        onClick={() => {
                            return onClickTab(1);
                        }}
                    >
                        상담사
                    </button>
                </div>
                <div className="tab_content">
                    <ul>
                        <li>
                            <span className="label">이메일</span>
                            <input
                                className={`${
                                    inputError.inputStyle === "email"
                                        ? "email error"
                                        : "email"
                                }`}
                                type="text"
                                name="email"
                                value={joinData.email}
                                onChange={onChange}
                            />
                            <button
                                className="email_validation_button"
                                disabled={!joinData.email}
                                onClick={onSubmitEmailForbbiden}
                            >
                                중복확인
                            </button>
                        </li>
                        <li>
                            <span className="label">비밀번호</span>
                            <input
                                className={
                                    inputError.inputStyle === "password"
                                        ? "error"
                                        : ""
                                }
                                type="password"
                                name="password"
                                value={joinData.password}
                                onChange={onChange}
                            />
                        </li>
                        <li>
                            <span className="label">비밀번호 확인</span>
                            <input
                                className={
                                    inputError.inputStyle === "password"
                                        ? "error"
                                        : ""
                                }
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={onChangeConfirmPassword}
                            />
                        </li>
                        <li>
                            <span className="label">이름</span>
                            <input
                                type="text"
                                name="name"
                                value={joinData.name}
                                onChange={onChange}
                            />
                        </li>
                        <li>
                            <span className="label">나이</span>
                            <input
                                type="text"
                                name="age"
                                value={joinData.age}
                                onChange={onChange}
                            />
                        </li>
                        {activeTab === 1 && (
                            <li>
                                <span className="label">휴대폰 번호</span>
                                <input
                                    className={
                                        inputError.inputStyle === "phoneNumber"
                                            ? "error"
                                            : ""
                                    }
                                    type="text"
                                    name="phoneNumber"
                                    value={joinData.phoneNumber}
                                    onChange={onChange}
                                />
                            </li>
                        )}
                        <li>
                            <span className="label">성별</span>
                            <input
                                type="radio"
                                name="gender"
                                value="1"
                                onChange={onChangeRadio}
                            />
                            <label>남성</label>{" "}
                            <input
                                type="radio"
                                name="gender"
                                value="2"
                                onChange={onChangeRadio}
                            />
                            <label>여성</label>{" "}
                        </li>
                    </ul>
                    <p className="error_message">{inputError.errorMessage}</p>

                    {activeTab === 1 && (
                        <div className="guide_msg_box">
                            <button
                                className="toggle_btn"
                                onClick={onClickToggle}
                            >
                                상담사 회원가입 안내사항
                                {toggle ? (
                                    <MdKeyboardArrowUp />
                                ) : (
                                    <MdKeyboardArrowDown />
                                )}
                            </button>
                            {toggle && (
                                <p className="guide_msg">
                                    없으면, 싹이 가는 있는 불어 대고, 약동하다.
                                    풀이 이상의 못하다 위하여서. 간에 구하지
                                    인간은 우리의 거친 가슴에 뛰노는 무엇을
                                    있는가?
                                </p>
                            )}
                        </div>
                    )}
                </div>
                <button
                    className="join_btn"
                    onClick={onSubmit}
                    disabled={
                        activeTab === 1
                            ? !joinData.email ||
                              !joinData.name ||
                              !joinData.password ||
                              !joinData.phoneNumber ||
                              !joinData.gender ||
                              !joinData.age ||
                              props.emailForbidden
                            : !joinData.email ||
                              !joinData.password ||
                              !joinData.name ||
                              !joinData.gender ||
                              !joinData.age ||
                              props.emailForbidden
                    }
                >
                    가입하기
                </button>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        emailForbidden: state.user.emailForbidden
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        postUser: (payload) => dispatch(userActions.postUser(payload)),
        postWaiterUser: (payload) =>
            dispatch(userActions.postWaiterUser(payload)),
        getUserValidate: (payload) =>
            dispatch(userActions.getUserValidate(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinPopup);
