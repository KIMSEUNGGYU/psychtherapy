import React, { useState, useEffect } from "react";
import "./Detail.scss";
import { history } from "client/store";
import { getToken, parsingToken } from "client/others/token";
import { Table } from "client/components";
import moment from "moment";

const Detail = (props) => {
    console.log(props, props.partner.schedules, "Detail props");

    const [reserved, setReserved] = useState([]);
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
            props.getPartner({ id: userInfo.userId });
        }
    }, [userInfo]);

    const CounselingProps = {
        ths: {
            scheduleId: "예약 번호 (ID)",
            reservation: "예약 확인",
            startedAt: "예약 시간",
            roomId: "ROOM ID"
        },
        tds: props.user.schedules,
        nonePaginationsProps: true
    };

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
                        roomId: "asdwdasd",
                        startedAt: "2020-08-29 20:30:00"
                    },
                    {
                        scheduleId: 37,
                        reservation: 1,
                        roomId: "asdwdsdsdasd",
                        startedAt: "2020-08-29 20:00:00"
                    }
                ];
                let arr = [];
                test.forEach((el, index) => {
                    // props.partner.schedules.forEach((el) => {
                    if (el["reservation"] === 1) {
                        arr.push(el);
                    }
                });
                setReserved(arr);
            }
        }
        if (userInfo.type === 0) {
            if (props.user.schedules) {
                let arr = [];
                props.partner.schedules.forEach((el) => {
                    if (el["reservation"] === 1) {
                        arr.push(el);
                    }
                });
                setReserved(arr);
            }
        }
    }, [props.partner, props.user]);

    console.log(reserved, "??");

    const reservationTableProps = {
        ths: {
            scheduleId: "예약 번호 (ID)",
            startedAt: "예약 시간"
        },
        tds: reserved,
        actions: [
            {
                commonBtn: true,
                className: "reserve_btn",
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
                <Table {...CounselingProps} />
                <p className="sub_title">예약 내역</p>
                <Table {...reservationTableProps} />
            </div>
        </div>
    );
};

export default Detail;
