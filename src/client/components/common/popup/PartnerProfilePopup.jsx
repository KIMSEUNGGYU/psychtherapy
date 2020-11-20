import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    MdRadioButtonChecked,
    MdRadioButtonUnchecked,
    MdFileUpload
} from "react-icons/md";
import { actions as partnersActions } from "client/modules/partners";
import { actions as adminActions } from "client/modules/admin";
import { keywords } from "client/others/const";
import { LayerPopup } from "client/libs/popup";

const PartnerProfilePopup = (props) => {
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
        certificate,
        image
    } = partnerData;

    useEffect(() => {
        props.getPartner({
            partnerId: props.id
        });
    }, []);

    useEffect(() => {
        setPartnerData({ ...props.partner, evaluate: props.type === "edit" });
    }, [props.partner, props.type]);

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
    const onChangeImageFile = (e) => {
        let f = e.target.files[0];
        let reader = new FileReader();
        reader.onload = ((theFile) => {
            return (e) => {
                let binaryData = e.target.result;
                let base64String = window.btoa(binaryData);
                setPartnerData((partnerData) => ({
                    ...partnerData,
                    image: `data:image/jpg;base64, ${base64String}`
                }));
            };
        })(f);
        reader.readAsBinaryString(f);
    };
    const onClickSave = () => {
        const callbackFunc = () => {
            LayerPopup.hide(props.layerKey);
            props.setQueryData();
        };
        props.putPartner({ partnerData, callbackFunc });
    };
    return (
        <Fragment>
            <p className="title">{props.type==="edit" ? "파트너 정보 입력" : "상담자 정보"}</p>
            <div className="flex_box">
                <div className="left_box">
                    <p className="sub-title">프로필 설정</p>
                    <div className="picture_box">
                        <div className="img_box">
                            <img src={image} alt="" />
                        </div>
                        {
                            props.type==="edit" &&
                            <>
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
                                    readOnly={props.type!=='edit'}
                                />
                            </>
                        }
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
                                    readOnly={props.type!=='edit'}
                                />
                            </li>{" "}
                            <li>
                                <span className="label">이름</span>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={onChangePartnerData}
                                    value={name}
                                    readOnly={props.type!=='edit'}
                                />{" "}
                            </li>{" "}
                            <li>
                                <span className="label">나이</span>
                                <input
                                    type="text"
                                    name="age"
                                    onChange={onChangePartnerData}
                                    value={age ? age : ""}
                                    readOnly={props.type!=='edit'}
                                />{" "}
                            </li>{" "}
                            <li>
                                <span className="label">전화번호</span>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    onChange={onChangePartnerData}
                                    value={phoneNumber}
                                    readOnly={props.type!=='edit'}
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
                                        disabled={props.type!=='edit'}
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
                                        disabled={props.type!=='edit'}
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
                                <span className="label">가격</span>
                                <input
                                    type="text"
                                    name="chatCost"
                                    onChange={onChangePartnerData}
                                    value={chatCost}
                                    readOnly={props.type!=='edit'}
                                />
                            </li>{" "}
                            <li>
                                <span className="label">한줄 소개</span>
                                <input
                                    type="text"
                                    name="shortInfo"
                                    onChange={onChangePartnerData}
                                    value={shortInfo}
                                    readOnly={props.type!=='edit'}
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
                                        readOnly={props.type!=='edit'}
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
                                        readOnly={props.type!=='edit'}
                                    />
                                    {/* <button>+</button> */}
                                </span>
                            </li>{" "}
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
                                        disabled={props.type!=='edit'}
                                    >
                                        {Number(certificate) === 1 ? (
                                            <MdRadioButtonChecked />
                                        ) : (
                                            <MdRadioButtonUnchecked />
                                        )}
                                        공인 심리 전문가(1급)
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
                                        disabled={props.type!=='edit'}
                                    >
                                        {Number(certificate) === 2 ? (
                                            <MdRadioButtonChecked />
                                        ) : (
                                            <MdRadioButtonUnchecked />
                                        )}
                                        전문가
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
                                        disabled={props.type!=='edit'}
                                    >
                                        {Number(certificate) === 3 ? (
                                            <MdRadioButtonChecked />
                                        ) : (
                                            <MdRadioButtonUnchecked />
                                        )}
                                        수련생
                                    </button>{" "}
                                </div>
                            </li>
                            <li className="keyword_box">
                                <span className="label">전문 분야</span>
                                <div className="checkbox_box">
                                    {keywords.map((el, key) => {
                                        return (
                                            <button
                                                key={key}
                                                className={`${
                                                    keyword === el && "active"
                                                }`}
                                                onClick={(e) =>
                                                    onClickPartnerData(
                                                        e,
                                                        "keyword",
                                                        el
                                                    )
                                                }
                                                disabled={props.type!=='edit'}
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
                                    readOnly={props.type!=='edit'}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {
              props.type ==='edit' &&
              <button className="save_btn" onClick={onClickSave}>
                저장하기
              </button>
            }
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        partner: state.partners.partner
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPartner: (payload) => dispatch(partnersActions.getPartner(payload)),
        putPartner: (payload) => dispatch(adminActions.putPartner(payload))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerProfilePopup);
