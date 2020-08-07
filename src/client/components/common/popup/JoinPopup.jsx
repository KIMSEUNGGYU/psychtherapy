import React, { Fragment, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const JoinPopup = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [toggle, setToggle] = useState(true);
    const onClickTab = (tabId) => {
        setActiveTab(tabId);
    };
    const onClickToggle = () => {
        setToggle(!toggle);
    };
    return (
        <Fragment>
            <p className="title">회원가입</p>
            <div className="tab_box">
                <div className="tab_btn_box">
                    <button
                        className={`tab_btn ${activeTab === 0 && "active"}`}
                        onClick={() => { return onClickTab(0); }}
                    >
                        일반
                    </button>
                    <button
                        className={`tab_btn ${activeTab === 1 && "active"}`}
                        onClick={() => { return onClickTab(1); }}
                    >
                        상담사
                    </button>
                </div>
                <div className="tab_content">
                    <ul>
                        <li>
                            <span className="label">이메일</span>
                            <input type="text" />
                        </li>
                        <li>
                            <span className="label">비밀번호</span>
                            <input type="text" />
                        </li>
                        <li>
                            <span className="label">비밀번호 확인</span>
                            <input type="text" />
                        </li>
                        <li>
                            <span className="label">이름</span>
                            <input type="text" />
                        </li>
                        <li>
                            <span className="label">나이</span>
                            <input type="text" />
                        </li>
                        {activeTab === 1 && (
                            <li>
                                <span className="label">소개글</span>
                                <input
                                    type="text"
                                    placeholder="20자 이내로 입력하세요"
                                />
                            </li>
                        )}
                        <li>
                            <span className="label">성별</span>
                            <input type="radio" name="gender" value="male" />
                            <label>남성</label>
                            {" "}
                            <input type="radio" name="gender" value="female" />
                            <label>여성</label>
                            {" "}
                        </li>
                    </ul>
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

                <button className="join_btn">가입하기</button>
            </div>
        </Fragment>
    );
};

export default JoinPopup;
