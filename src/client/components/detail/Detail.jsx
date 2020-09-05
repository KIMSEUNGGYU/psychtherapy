import React, { useState, useEffect } from "react";
import "./Detail.scss";
import { history } from "client/store";
import { getToken, parsingToken } from "client/others/token";
import { Table } from "client/components";
import moment from "moment";
import InfoBox from "../common/InfoBox";

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
                let tempReserved = [];
                let tempEndConsultation = [];
                props.partner.schedules.forEach((el) => {
                    if (el["reservation"] === 1) {
                        const currentTime = moment();
                        const reservedTime = moment(el["startedAt"]);
                        const duration = moment
                            .duration(currentTime.diff(reservedTime))
                            .asMinutes();
                        if (duration > 30) {
                            tempEndConsultation.push(el);
                        }
                        if (duration <= 30) {
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
                let tempReserved = [];
                let tempEndConsultation = [];
                props.user.schedules.forEach((el) => {
                    if (el["reservation"] === 1) {
                        const currentTime = moment();
                        const reservedTime = moment(el["startedAt"]);
                        const duration = moment
                            .duration(currentTime.diff(reservedTime))
                            .asMinutes();
                        if (duration > 30) {
                            tempEndConsultation.push(el);
                        }
                        if (duration <= 30) {
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
            startedAt: "상담 리스트"
        },
        tds: endConsultation,
        actions: [
            {
                commonBtn: true,
                className: "reserve_status_btn",
                callbackFunc: (roomId, startAt) => {
                    props.history.push(
                        `/chat/${roomId}/${
                            userInfo.type === 0
                                ? props.user.id
                                : props.partner.id
                        }/${startAt}`
                    );
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
                callbackFunc: (roomId, startAt) => {
                    props.history.push(
                        `/chat/${roomId}/${
                            userInfo.type === 0
                                ? props.user.id
                                : props.partner.id
                        }/${startAt}`
                    );
                }
            }
        ],
        nonePaginationsProps: true
    };

    const infoBoxUserProps = {
        label: {
            age: "나이",
            email: "아이디 / 이메일",
            gender: "성별",
            point: "잔여 포인트"
        },
        value: {
            age: props.user.name,
            email: props.user.email,
            gender: props.partner.gender === 1 ? "남자" : "여자",
            point: props.user.point
        }
    };

    const infoBoxPartnerProps = {
        label: {
            name: "이름",
            age: "나이",
            email: "아이디 / 이메일",
            phoneNumber: "연락처",
            gender: "성별",
            level: "파트너 등급",
            certificate: "관련 자격증",
            chatCost: "상담 가격",
            keyword: "상담 키워드"
        },
        value: {
            name: props.partner.name,
            age: props.partner.age,
            email: props.partner.email,
            phoneNumber: props.partner.phoneNumber.replace(
                /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
                "$1-$2-$3"
            ),
            gender: props.partner.gender === 1 ? "남자" : "여자",
            level:
                props.partner.level === 1
                    ? "마스터(Master)"
                    : props.partner.level === 2
                    ? "전문가(Export)"
                    : props.partner.level === 3
                    ? "일반(Nomal)"
                    : "",
            certificate:
                props.partner.certificate === 1
                    ? "1급"
                    : props.partner.certificate === 2
                    ? "2급"
                    : props.partner.certificate === 3
                    ? "무급"
                    : "",
            chatCost: props.partner.chatCost,
            keyword: props.partner.keyword
        }
    };

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
                <p className="sub_title">나의 정보</p>
                {userInfo.type === 0 ? (
                    <InfoBox {...infoBoxUserProps} />
                ) : (
                    <InfoBox {...infoBoxPartnerProps} />
                )}
                <p className="sub_title">상담 내역</p>
                <Table {...endConsultationTableProps} />
                <p className="sub_title">예약 내역</p>
                <Table {...reservationTableProps} />
            </div>
        </div>
    );
};

export default Detail;
