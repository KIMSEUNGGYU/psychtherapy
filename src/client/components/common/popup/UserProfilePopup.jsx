import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    MdRadioButtonChecked,
    MdRadioButtonUnchecked,
} from "react-icons/md";
import { actions as userActions } from "client/modules/user";
import moment from "moment";

const UserProfilePopup = (props) => {
    const [userData, setUserData] = useState(props.user);
    const {
        email,
        name,
        gender,
        age,
        phoneNumber,
    } = userData;
    const [endConsultation, setEndConsultation] = useState([]);

    useEffect(() => {
        let condition={}
        if(props.userId) condition.userId = props.userId;
        if(props.partnerId) condition.partnerId = props.partnerId;
        props.getUser(condition);
    }, []);

    useEffect(() => {
        setUserData({ ...props.user, evaluate: props.type === "edit" });
    }, [props.user, props.type]);

    useEffect(() => {
        if(userData.schedules) {
            let tempEndConsultation = [];
            userData.schedules.forEach((el) => {
                if (el["reservation"] === 1) {
                    const currentTime = moment();
                    const reservedTime = moment(el["startedAt"]);
                    const duration = moment
                        .duration(currentTime.diff(reservedTime))
                        .asMinutes();
                    if (duration > 30) {
                        tempEndConsultation.push(el);
                    }
                }
            });
            setEndConsultation(tempEndConsultation);
        }
    }, [userData]);


    const tableProps = {
      ths: {
            scheduleId: "예약 번호 (ID)",
            consultDay: "상담 일자",
            startedAt: "상담 시작 시간",
            endAt: "상담 종료 시간",
      },
      tds: endConsultation,
      actions: [
        {
            className: "reserve_status_btn",
            callbackFunc: (roomId, startAt) => {
                props.history.push(
                    `/chat/${roomId}/${
                        props.partnerId
                    }/${startAt}`
                );
            }
        }
    ],
      nonePaginationsProps: true
    };

    console.log('userData', props.userId, props.partnerId, userData)

    return (
        <Fragment>
            <p className="title">{props.type==="edit" ? "내담자 정보 입력" : "내담자 정보"}</p>
            <div className="flex_box">
            <p className="sub-title">프로필 설정</p>
            <div className="input_box">
                <ul>
                    <li>
                        <span className="label">이메일 주소</span>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            readOnly={props.type!=='edit'}
                        />
                    </li>{" "}
                    <li>
                        <span className="label">이름</span>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            readOnly={props.type!=='edit'}
                        />{" "}
                    </li>{" "}
                    <li>
                        <span className="label">나이</span>
                        <input
                            type="text"
                            name="age"
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
                    <li>
                        <span className="label">연락처</span>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={phoneNumber ? phoneNumber : ""}
                            readOnly={props.type!=='edit'}
                        />{" "}
                    </li>{" "}
                </ul>
            </div>
            <p className="sub-title">상담내역</p>
            <div className="table_box">
                <table>
                    <thead>
                        <tr>
                            {Object.keys(tableProps.ths).map((el, key) => {
                                return <th key={key}>{tableProps.ths[el]}</th>;
                            })}
                            {tableProps.actions && <th className="actions"></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {tableProps.tds.map((el, key) => {
                            return (
                                <tr key={key}>
                                    {Object.keys(tableProps.ths).map((ele, i) => {
                                        if(ele === "endAt") {
                                            const endAtTime = moment(el["startedAt"])
                                                .add(30, "minutes")
                                                .format("YYYY-MM-DD HH:mm:ss");
                                            return <td key={i}>{endAtTime}</td>;
                                        }
                                        if(ele === "consultDay") {
                                            const consultDay = moment(el["startedAt"])
                                                .format("MM/DD");
                                            return <td key={i}>{consultDay}</td>;
                                        }
                                        return <td key={i}>{el[ele]}</td>; 
                                    })}
                                    {tableProps.actions &&
                                    tableProps.actions.map((action, actionKey) => {
                                        const currentTime = moment();
                                        const reservedTime = moment(
                                            el["startedAt"]
                                        );
                                        const duration = moment
                                            .duration(
                                                currentTime.diff(
                                                    reservedTime
                                                )
                                            )
                                            .asMinutes();
                                            return (
                                                <td
                                                    className="actions"
                                                    key={actionKey}
                                                >
                                                    <button
                                                        className={
                                                        action.className
                                                        }
                                                        onClick={() =>
                                                            action.callbackFunc(
                                                                el[
                                                                    "roomId"
                                                                ],
                                                                el[
                                                                    "startedAt"
                                                                ]
                                                            )
                                                        }
                                                    >
                                                        상담내역
                                                    </button>
                                                </td>
                                            );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (payload) => dispatch(userActions.getUser(payload)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfilePopup);
