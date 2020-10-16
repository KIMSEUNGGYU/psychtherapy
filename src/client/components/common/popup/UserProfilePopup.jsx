import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    MdRadioButtonChecked,
    MdRadioButtonUnchecked,
} from "react-icons/md";
import { actions as userActions } from "client/modules/user";
import { actions as adminActions } from "client/modules/admin";
import { LayerPopup } from "client/libs/popup";

const PartnerProfilePopup = (props) => {
    const [userData, setUserData] = useState(props.user);
    const {
        email,
        name,
        gender,
        age,
    } = userData;

    useEffect(() => {
        props.getUser({
            userId: props.id
        });
    }, []);

    useEffect(() => {
        setUserData({ ...props.user, evaluate: props.type === "edit" });
    }, [props.user, props.type]);

    console.log('userData', userData)

    const onChangePartnerData = (e) => {
        const { name, value } = e.target;
        setUserData((userData) => ({
            ...userData,
            [name]: value
        }));
    };

    const onClickPartnerData = (e, key, value) => {
        setUserData((userData) => ({
            ...userData,
            [key]: value
        }));
    };
    const onClickSave = () => {
        const callbackFunc = () => {
            LayerPopup.hide(props.layerKey);
            props.setQueryData();
        };
        props.putPartner({ userData, callbackFunc });
    };
    return (
        <Fragment>
            <p className="title">{props.type==="edit" ? "내담자 정보 입력" : "내담자 정보"}</p>
            <div className="flex_box">
                <div className="left_box">
                    <p className="sub-title">프로필 설정</p>
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
                    <p className="sub-title">스케쥴</p>
                    <div className="input_box">
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
        partner: state.partners.partner,
        user: state.user.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (payload) => dispatch(userActions.getUser(payload)),
        getPartner: (payload) => dispatch(partnersActions.getPartner(payload)),
        putPartner: (payload) => dispatch(adminActions.putPartner(payload))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerProfilePopup);
