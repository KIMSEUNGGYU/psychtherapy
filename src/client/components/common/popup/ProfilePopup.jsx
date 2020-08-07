import React, { Fragment } from "react";
import {
    MdRadioButtonChecked,
    MdRadioButtonUnchecked,
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdFileUpload
} from "react-icons/md";
import doc1 from "client/images/doc1.jpg";

const ProfilePopup = () => {
    return (
        <Fragment>
            <p className="title">파트너 정보 입력</p>
            <div className="flex_box">
                <div className="left_box">
                    <p className="sub-title">프로필 설정</p>
                    <div className="picture_box">
                        <div className="img_box">
                            <img src={doc1} alt="" />
                        </div>
                        <button className="upload_btn">
                            <MdFileUpload />
                            사진 업로드
                        </button>
                    </div>
                    <div className="input_box">
                        <ul>
                            <li>
                                <span className="label">이메일 주소</span>
                                <input type="text" />
                            </li>{" "}
                            <li>
                                <span className="label">이름</span>
                                <input type="text" />
                            </li>{" "}
                            <li>
                                <span className="label">나이</span>
                                <input type="text" />
                            </li>{" "}
                            <li>
                                <span className="label">전화번호</span>
                                <input type="text" />
                            </li>
                            <li>
                                <span className="label">성별</span>
                                <div className="radio_btn_box">
                                    <button>
                                        <MdRadioButtonUnchecked />
                                        남자
                                    </button>{" "}
                                    <button className="active">
                                        <MdRadioButtonChecked />
                                        여자
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="right_box">
                    <p className="sub-title">도메인 설정</p>
                    <div className="input_box">
                        <ul>
                            <li>
                                <span className="label">한줄 소개</span>
                                <input type="text" />
                            </li>{" "}
                            <li className="career_box">
                                <span className="label">경력</span>
                                <span>
                                    <input type="text" />
                                    <button>+</button>
                                </span>
                            </li>{" "}
                            <li>
                                <span className="label">레벨</span>
                                <div className="radio_btn_box">
                                    <button className="active">
                                        <MdRadioButtonChecked />
                                        마스터
                                    </button>{" "}
                                    <button>
                                        <MdRadioButtonUnchecked />
                                        전문가
                                    </button>{" "}
                                    <button>
                                        <MdRadioButtonUnchecked />
                                        일반
                                    </button>
                                </div>
                            </li>
                            <li>
                                <span className="label">자격증</span>
                                <div className="radio_btn_box">
                                    <button className="active">
                                        <MdRadioButtonChecked />
                                        1급
                                    </button>{" "}
                                    <button>
                                        <MdRadioButtonUnchecked />
                                        2급
                                    </button>{" "}
                                    <button>
                                        <MdRadioButtonUnchecked />
                                        3급
                                    </button>
                                </div>
                            </li>
                            <li className="keyword_box">
                                <span className="label">키워드</span>
                                <div className="checkbox_box">
                                    <button>
                                        <MdCheckBoxOutlineBlank />
                                        우울
                                    </button>
                                    <button>
                                        <MdCheckBoxOutlineBlank />
                                        불안
                                    </button>
                                    <button>
                                        <MdCheckBoxOutlineBlank />
                                        강박
                                    </button>
                                    <button>
                                        <MdCheckBoxOutlineBlank />
                                        무기력
                                    </button>
                                    <button>
                                        <MdCheckBoxOutlineBlank />
                                        자살
                                    </button>
                                    <button>
                                        <MdCheckBoxOutlineBlank />
                                        친구
                                    </button>
                                    <button>
                                        <MdCheckBoxOutlineBlank />
                                        자해
                                    </button>
                                    <button>
                                        <MdCheckBoxOutlineBlank />
                                        공황
                                    </button>
                                    <button>
                                        <MdCheckBoxOutlineBlank />
                                        부부
                                    </button>
                                    <button>
                                        <MdCheckBoxOutlineBlank />
                                        연인
                                    </button>
                                    <button>
                                        <MdCheckBoxOutlineBlank />
                                        취업
                                    </button>
                                    <button>
                                        <MdCheckBoxOutlineBlank />
                                        진로
                                    </button>
                                    <button>
                                        <MdCheckBoxOutlineBlank />
                                        성소수자
                                    </button>
                                    <button>
                                        <MdCheckBoxOutlineBlank />
                                        공황장애
                                    </button>
                                </div>
                            </li>
                            <li>
                                <span className="label">상세 정보</span>
                                <input type="textarea" />
                            </li>{" "}
                        </ul>
                    </div>
                </div>
            </div>
            <button className="save_btn">저장하기</button>
        </Fragment>
    );
};

export default ProfilePopup;
