import React, { useEffect, useState } from "react";
import "./Counselor.scss";
import { AiOutlineYoutube } from "react-icons/ai";
import moment from "moment";
import doc1 from "client/images/doc1.jpg";
import { Scheduler } from "client/components";

const Counselor = (props) => {
    const { partner, getPartner, match } = props;
    const { prev_search, id } = match.params;
    useEffect(() => {
        getPartner({ id });
    }, []);
    const { partner_id } = props.match.params;

    const [times, setTimes] = useState([]);
    const [scheduleDate, setScheduleDate] = useState(
        moment().format("YYYY-MM-DD")
    );
    useEffect(() => {
        const payload = {
            partnerId: Number(partner_id),
            date: moment().format("YYYY-MM-DD")
        };
        props.getPartnerScheduleList(payload);
    }, []);

    useEffect(() => {
        if (props.schedules) {
            console.log(props.schedules);
            let scheduleArr = [];
            for (let i = 0; i < 48; i++) {
                const startedAt = moment()
                    .utcOffset(0)
                    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                    .add(i * 30, "minutes")
                    .format("YYYY-MM-DD HH:mm:ss");
                let obj = {
                    startedAt,
                    reservation: 2,
                    scheduleId: null
                };
                props.schedules.forEach((el) => {
                    if (el.startedAt === startedAt) {
                        obj["reservation"] = el.reservation;
                        obj["scheduleId"] = el.scheduleId;
                    }
                });
                scheduleArr.push(obj);
            }
            setTimes(scheduleArr);
        }
    }, [props.schedules]);
    const onClickSave = (edit, schedules) => {
        if (edit === "delete") {
            schedules.forEach((scheduleId) => {
                props.deletePartnerSchedule({
                    partnerId: Number(partner_id),
                    scheduleId
                });
            });
        } else {
            props.postPartnerSchedule({
                partnerId: Number(partner_id),
                date: scheduleDate,
                schedules
            });
        }
    };
    const schedulerProps = {
        schedules: props.schedules,
        userType: "partner",
        times,
        scheduleDate,
        setScheduleDate,
        onClickSave
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
                        <img src={doc1} alt="" />
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
                        {/* <button className="put_btn">상담 신청하기</button> */}
                    </div>
                    {/* <div className="put_box">
                        <div className="notice">
                            <p className="notice_title">결제 안내</p>
                            <p className="notice_txt">
                                대한민국의 영토는 한반도와 그 부속도서로 한다.
                                국회는 상호원조 또는 안전보장에 관한 조약 중요한
                                국제조직에 관한 조약, 국회는 상호원조
                            </p>
                        </div>
                        <div className="point_box flex_box between">
                            <p className="label">상담 가격</p>
                            <p className="value">5Point</p>
                        </div>
                        <button
                            className="put_btn"
                            onClick={() =>
                                props.history.push(
                                    "/counselors/1/counseling_payment"
                                )
                            }
                        >
                            상담 신청하기
                        </button>
                    </div> */}
                </div>
                <div className="scheduler_box">
                    <p className="sub_title">상담 가능 시간</p>
                    <Scheduler {...schedulerProps} />
                </div>
                <div className="payment_box flex_box between">
                    <p className="total">TOTAL :</p>
                    <div className="right_box">
                        <span className="point">5 POINT</span>
                        <button className="pay_btn">상담 신청하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Counselor;
