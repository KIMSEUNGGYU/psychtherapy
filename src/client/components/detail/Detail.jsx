import React, { useState, useEffect } from "react";
import "./Detail.scss";
import { history } from "client/store";
import { getToken, parsingToken } from "client/others/token";
import { Table } from "client/components";
import moment from "moment";

const Detail = (props) => {
    const [reserved, setReserved] = useState([]);
    const [endConsultation, setEndConsultation] = useState([]);
    const [userInfo, setUserInfo] = useState({
        userId: null,
        type: null
    });

    useEffect(() => {
        const token = getToken();
        const parsedToken = parsingToken(token);

        if (token) {
            setUserInfo({
                userId: parsedToken.userId,
                type: parsedToken.type
            });
        }
    }, [props.token, props.type]);

    useEffect(() => {
        if (userInfo.type === 0) {
            props.getUser();
        } else if (userInfo.type === 1) {
            props.getPartner({ partnerId: userInfo.userId });
        }
    }, [userInfo]);

    useEffect(() => {
        if (userInfo.type === 1) {
            if (props.partner.schedules) {
                const test = [
                    {
                        scheduleId: 36,
                        reservation: 0,
                        roomId: null,
                        startedAt: "2020-08-26T01:30:00.000Z"
                    },
                    {
                        scheduleId: 35,
                        reservation: 0,
                        roomId: null,
                        startedAt: "2020-08-26T01:30:00.000Z"
                    },
                    {
                        scheduleId: 36,
                        reservation: 1,
                        roomId: "39de47d4a5",
                        startedAt: "2020-08-31 14:00:00"
                    },
                    {
                        scheduleId: 37,
                        reservation: 1,
                        roomId: "39de47d4a5",
                        startedAt: "2020-08-31 13:00:00"
                    },
                    {
                        scheduleId: 37,
                        reservation: 1,
                        roomId: "39de47d4a5",
                        startedAt: "2020-08-31 18:00:00"
                    }
                ];
                let tempReserved = [];
                let tempEndConsultation= [];
                test.forEach((el) => {
                    // props.partner.schedules.forEach((el) => {
                    if (el["reservation"] === 1) {
                        const currentTime = moment();
                        const reservedTime = moment(el["startedAt"]);
                        const duration = moment.duration(currentTime.diff(reservedTime)).asMinutes();
                        if ( duration > 30 ) {
                            tempEndConsultation.push(el);
                        }
                        if ( duration <= 30 ) {
                            tempReserved.push(el);
                        }
                    }
                });
                setReserved(tempReserved);
                setEndConsultation(tempEndConsultation);
            }
        }
        if (userInfo.type === 0) {
            if (props.user.schedules) {
                const test = [
                    {
                        scheduleId: 36,
                        reservation: 0,
                        roomId: null,
                        startedAt: "2020-08-26T01:30:00.000Z"
                    },
                    {
                        scheduleId: 35,
                        reservation: 0,
                        roomId: null,
                        startedAt: "2020-08-26T01:30:00.000Z"
                    },
                    {
                        scheduleId: 36,
                        reservation: 1,
                        roomId: "39de47d4a5",
                        startedAt: "2020-08-31 14:00:00"
                    },
                    {
                        scheduleId: 37,
                        reservation: 1,
                        roomId: "39de47d4a5",
                        startedAt: "2020-08-31 13:00:00"
                    },
                    {
                        scheduleId: 37,
                        reservation: 1,
                        roomId: "39de47d4a5",
                        startedAt: "2020-08-31 18:00:00"
                    }
                ];
                let tempReserved = [];
                let tempEndConsultation= [];
                test.forEach((el) => {
                // props.user.schedules.forEach((el) => {
                    if (el["reservation"] === 1) {
                        const currentTime = moment();
                        const reservedTime = moment(el["startedAt"]);
                        const duration = moment.duration(currentTime.diff(reservedTime)).asMinutes();
                        if ( duration > 30 ) {
                            tempEndConsultation.push(el);
                        }
                        if ( duration <= 30 ) {
                            tempReserved.push(el);
                        }
                    }
                });
                setReserved(tempReserved);
                setEndConsultation(tempEndConsultation);
            }
        }
    }, [props.partner, props.user]);

    const endConsultationTableProps = {
        ths: {
            scheduleId: "예약 번호 (ID)",
            startedAt: "상담 리스트",

        },
        tds: endConsultation,
        actions: [
            {
                commonBtn: true,
                className: "reserve_status_btn",
                callbackFunc: (roomId) => {
                    alert(roomId, "???");
                }
            }
        ],
        nonePaginationsProps: true
    };
    const reservationTableProps = {
        ths: {
            scheduleId: "예약 번호 (ID)",
            startedAt: "예약 리스트"
        },
        tds: reserved,
        actions: [
            {
                commonBtn: true,
                className: "reserve_status_btn",
                callbackFunc: (roomId) => {
                    alert(roomId, "???");
                }
            }
        ],
        nonePaginationsProps: true
    };

    console.log(props.user, props.partner, "마이페이지 정보");

    return (
        <div className="container detail">
            <div className="layout">
                <div className="title_box">
                    <p className="title">마이페이지</p>
                    {userInfo.type === 1 && (
                        <button
                            className="schedule-btn"
                            onClick={() =>
                                history.push(
                                    `schedule_management/${userInfo.userId}`
                                )
                            }
                        >
                            스케쥴 관리하기
                        </button>
                    )}
                </div>
                <p className="sub_title">상담 내역</p>
                <Table {...endConsultationTableProps} />
                <p className="sub_title">예약 내역</p>
                <Table {...reservationTableProps} />
            </div>
        </div>
    );
};

export default Detail;
