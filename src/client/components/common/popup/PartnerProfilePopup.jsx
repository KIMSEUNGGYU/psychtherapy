import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    MdRadioButtonChecked,
    MdRadioButtonUnchecked,
    MdFileUpload
} from "react-icons/md";
import doc1 from "client/images/doc1.jpg";
import { actions as partnersActions } from "client/modules/counselors";
import { actions as adminActions } from "client/modules/admin";
// import { keywords } from "client/others/const";
export const keywords = [
    "우울",
    "불안",
    "강박",
    "무기력",
    "자살",
    "자해",
    "친구",
    "공황",
    "부부",
    "연인",
    "진로",
    "취업",
    "성소수자",
    "감정조절"
];
const PartnerProfilePopup = (props) => {
    console.log(props.partner, "props");
    useEffect(() => {}, []);
    const [partnerData, setPartnerData] = useState(props.partner);
    const {
        email,
        name,
        phoneNumber,
        gender,
        age,
        url,
        shortInfo,
        career,
        info,
        keyword,
        chatCost,
        level,
        certificate,
        image,
        evaluate
    } = partnerData;

    const onChangePartnerData = (e) => {
        const { name, value } = e.target;
        setPartnerData((partnerData) => ({
            ...partnerData,
            [name]: value
        }));
    };

    const onClickPartnerData = (e, key, value) => {
        setPartnerData((partnerData) => ({
            ...partnerData,
            [key]: value
        }));
    };
    const onChangeImageFile = async (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        // 서버의 upload API 호출
        // const res = await axios.post("/api/upload", formData);
    };
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
                        <label
                            className="upload_btn custom-file-upload"
                            htmlFor="file-upload"
                        >
                            <MdFileUpload />
                            사진 업로드
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            onChange={onChangeImageFile}
                        />
                    </div>
                    <div className="input_box">
                        <ul>
                            <li>
                                <span className="label">이메일 주소</span>
                                <input
                                    type="text"
                                    name="email"
                                    onChange={onChangePartnerData}
                                    value={email}
                                />
                            </li>{" "}
                            <li>
                                <span className="label">이름</span>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={onChangePartnerData}
                                    value={name}
                                />{" "}
                            </li>{" "}
                            <li>
                                <span className="label">나이</span>
                                <input
                                    type="text"
                                    name="age"
                                    onChange={onChangePartnerData}
                                    value={age ? age : ""}
                                />{" "}
                            </li>{" "}
                            <li>
                                <span className="label">전화번호</span>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    onChange={onChangePartnerData}
                                    value={phoneNumber}
                                />
                            </li>
                            <li>
                                <span className="label">성별</span>
                                <div className="radio_btn_box">
                                    <button
                                        className={`${
                                            Number(gender) === 1 && "active"
                                        }`}
                                        onClick={(e) =>
                                            onClickPartnerData(e, "gender", 1)
                                        }
                                    >
                                        {Number(gender) === 1 ? (
                                            <MdRadioButtonChecked />
                                        ) : (
                                            <MdRadioButtonUnchecked />
                                        )}
                                        남자
                                    </button>{" "}
                                    <button
                                        className={`${
                                            Number(gender) === 2 && "active"
                                        }`}
                                        onClick={(e) =>
                                            onClickPartnerData(e, "gender", 2)
                                        }
                                    >
                                        {Number(gender) === 2 ? (
                                            <MdRadioButtonChecked />
                                        ) : (
                                            <MdRadioButtonUnchecked />
                                        )}
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
                                <input
                                    type="text"
                                    name="shortInfo"
                                    onChange={onChangePartnerData}
                                    value={shortInfo}
                                />
                            </li>{" "}
                            <li>
                                <span className="label">경력</span>
                                <span>
                                    <input
                                        type="text"
                                        name="career"
                                        onChange={onChangePartnerData}
                                        value={career}
                                    />
                                    {/* <button>+</button> */}
                                </span>
                            </li>{" "}
                            <li>
                                <span className="label">동영상 링크</span>
                                <span>
                                    <input
                                        type="text"
                                        name="url"
                                        onChange={onChangePartnerData}
                                        value={url}
                                    />
                                    {/* <button>+</button> */}
                                </span>
                            </li>{" "}
                            <li>
                                <span className="label">레벨</span>
                                <div className="radio_btn_box">
                                    <button
                                        className={`${
                                            Number(level) === 1 && "active"
                                        }`}
                                        onClick={(e) =>
                                            onClickPartnerData(e, "level", 1)
                                        }
                                    >
                                        {Number(level) === 1 ? (
                                            <MdRadioButtonChecked />
                                        ) : (
                                            <MdRadioButtonUnchecked />
                                        )}
                                        마스터
                                    </button>{" "}
                                    <button
                                        className={`${
                                            Number(level) === 2 && "active"
                                        }`}
                                        onClick={(e) =>
                                            onClickPartnerData(e, "level", 2)
                                        }
                                    >
                                        {Number(level) === 2 ? (
                                            <MdRadioButtonChecked />
                                        ) : (
                                            <MdRadioButtonUnchecked />
                                        )}
                                        전문가
                                    </button>{" "}
                                    <button
                                        className={`${
                                            Number(level) === 3 && "active"
                                        }`}
                                        onClick={(e) =>
                                            onClickPartnerData(e, "level", 3)
                                        }
                                    >
                                        {Number(level) === 3 ? (
                                            <MdRadioButtonChecked />
                                        ) : (
                                            <MdRadioButtonUnchecked />
                                        )}
                                        일반
                                    </button>{" "}
                                </div>
                            </li>
                            <li>
                                <span className="label">자격증</span>
                                <div className="radio_btn_box">
                                    <button
                                        className={`${
                                            Number(certificate) === 1 &&
                                            "active"
                                        }`}
                                        onClick={(e) =>
                                            onClickPartnerData(
                                                e,
                                                "certificate",
                                                1
                                            )
                                        }
                                    >
                                        {Number(certificate) === 1 ? (
                                            <MdRadioButtonChecked />
                                        ) : (
                                            <MdRadioButtonUnchecked />
                                        )}
                                        1급
                                    </button>{" "}
                                    <button
                                        className={`${
                                            Number(certificate) === 2 &&
                                            "active"
                                        }`}
                                        onClick={(e) =>
                                            onClickPartnerData(
                                                e,
                                                "certificate",
                                                2
                                            )
                                        }
                                    >
                                        {Number(certificate) === 2 ? (
                                            <MdRadioButtonChecked />
                                        ) : (
                                            <MdRadioButtonUnchecked />
                                        )}
                                        2급
                                    </button>{" "}
                                    <button
                                        className={`${
                                            Number(certificate) === 3 &&
                                            "active"
                                        }`}
                                        onClick={(e) =>
                                            onClickPartnerData(
                                                e,
                                                "certificate",
                                                3
                                            )
                                        }
                                    >
                                        {Number(certificate) === 3 ? (
                                            <MdRadioButtonChecked />
                                        ) : (
                                            <MdRadioButtonUnchecked />
                                        )}
                                        3급
                                    </button>{" "}
                                </div>
                            </li>
                            <li className="keyword_box">
                                <span className="label">키워드</span>
                                <div className="checkbox_box">
                                    {keywords.map((el, key) => {
                                        return (
                                            <button
                                                key={key}
                                                className={`${
                                                    keyword === el && "active"
                                                }`}
                                            >
                                                {keyword === el ? (
                                                    <MdRadioButtonChecked />
                                                ) : (
                                                    <MdRadioButtonUnchecked />
                                                )}
                                                {el}
                                            </button>
                                        );
                                    })}
                                </div>
                            </li>
                            <li>
                                <span className="label">상세 정보</span>
                                <input
                                    type="textarea"
                                    name="info"
                                    onChange={onChangePartnerData}
                                    value={info}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <button className="save_btn">저장하기</button>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        partner: state.counselors.partner
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPartner: (payload) => dispatch(adminActions.getPartners(payload)),
        putPartner: (payload) => dispatch(adminActions.putPartner(payload))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerProfilePopup);
