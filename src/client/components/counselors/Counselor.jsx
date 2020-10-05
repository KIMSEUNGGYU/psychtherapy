import React, { useEffect, useState } from "react";
import "./Counselor.scss";
import { AiOutlineYoutube } from "react-icons/ai";
import moment from "moment";
import { Scheduler, Popup } from "client/components";

const Counselor = props => {
    const { partner, getPartner, match, getUser } = props;
    const { prev_search, partner_id } = match.params;

    const [times, setTimes] = useState([]);
    const [scheduleDate, setScheduleDate] = useState(
        moment().format("YYYY-MM-DD")
    );
    const [reservedId, setReservedId] = useState(0);
    const [totalPoint, setTotalPoint] = useState(0);
    const m = moment();

    useEffect(() => {
        getPartner({ partnerId: Number(partner_id) });
        getUser();
    }, []);

    useEffect(() => {
        const _totalPoint = reservedId
            ? props.partner.level === 1
                ? 75000
                : props.partner.level === 2
                ? 50000
                : props.partner.level === 3
                ? 25000
                : props.partner.level
            : 0;
        setTotalPoint(_totalPoint);
    }, [reservedId]);

    useEffect(() => {
        if (props.partner.schedules) {
            let scheduleArr = [];
            for (let i = 0; i < 48; i++) {
                const startedAt = moment(scheduleDate)
                    .utcOffset("+0900")
                    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                    .add(i * 30, "minutes")
                    .format("YYYY-MM-DD HH:mm:ss");
                let obj = {
                    startedAt,
                    reservation: 2,
                    scheduleId: null
                };
                props.partner.schedules.forEach(el => {
                    if (m.valueOf() > moment(startedAt)) {
                        obj["reservation"] = 3;
                    } else if (el.startedAt === startedAt) {
                        obj["reservation"] = el.reservation;
                        obj["scheduleId"] = el.scheduleId;
                    }
                });
                scheduleArr.push(obj);
            }
            console.log(scheduleArr);
            setTimes(scheduleArr);
        }
    }, [props.partner, scheduleDate]);

    const onClickApply = () => {
        if (!props.user.id) {
            Popup.loginPopup({
                className: "login"
            });
            return;
        }
        if (props.user.point < totalPoint) {
            alert("포인트가 부족합니다");
            props.history.push("/pricing");
            return;
        }
        props.putPurchasePoint({
            userId: props.user.id,
            point: totalPoint,
            partnerId: Number(partner_id),
            scheduleId: reservedId
        });
    };
    const schedulerProps = {
        schedules: props.partner.schedules,
        userType: "user",
        times,
        scheduleDate,
        setScheduleDate,
        reservedId,
        setReservedId
    };
    return (
        <div className="container counselor">
            <div className="layout">
                <div className="breadcrumb">
                    <button onClick={() => props.history.push("/")}>홈</button>
                    <span> &#62; </span>
                    <button
                        onClick={() =>
                            props.history.push(`/partners?${prev_search}`)
                        }
                    >
                        나만의 상담사 찾기
                    </button>
                    <span> &#62; </span>
                    <button>상담사 상세 정보</button>
                </div>
                <div className="top_box flex_box between">
                    <div className="img_box">
                        <img src={props.partner.image} alt="" />
                    </div>
                    <div className="txt_box">
                        <p className="level">
                            {partner.certificate}급{" "}
                            {partner.level === 1
                                ? "마스터"
                                : partner.level === 2
                                ? "전문"
                                : "일반"}{" "}
                            상담사
                        </p>
                        <p className="name">
                            안녕하세요
                            <br />
                            {partner.name} 상담사입니다
                        </p>
                        {/*[TO DO]*/}
                        <div className="career_box">
                            <ul>
                                <li>- {partner.career}</li>
                                {/* <li>- 상담심리사 2급(상담심리전문가)</li>
                                <li>- 임상심리사 1급(한국산업인력공단)</li>
                                <li>- 임상심리사 2급(한국산업인력공단)</li> */}
                            </ul>
                        </div>
                        <p className="long_info">{partner.info}</p>
                        <button
                            className="youtube_btn"
                            onClick={() => window.open(partner.url)}
                        >
                            <AiOutlineYoutube />
                            소개 영상 보러가기
                        </button>
                    </div>
                </div>
                <div className="scheduler_box">
                    <p className="sub_title">상담 가능 시간</p>
                    <Scheduler {...schedulerProps} />
                </div>
                <div className="payment_box flex_box between">
                    <p className="total">TOTAL :</p>
                    <div className="right_box">
                        <span className="point">{totalPoint} POINT</span>
                        <button
                            className="pay_btn"
                            onClick={onClickApply}
                            disabled={!reservedId}
                        >
                            상담 신청하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Counselor;
