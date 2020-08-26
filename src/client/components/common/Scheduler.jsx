import React, { useEffect, useState } from "react";
import "./Scheduler.scss";
import moment from "moment";
import "moment/locale/ko";
import { DeduplicationInArrContent } from "client/others/utils";
import { actions as scheduleActions } from "client/modules/schedule";
import { connect } from "react-redux";

const Scheduler = (props) => {
    console.log(props);
    const [scheduleDate, setScheduleDate] = useState(
        moment().format("YYYY-MM-DD")
    );
    const [scheduleData, setScheduleData] = useState([]);
    const [calenderValues, setCalenderValues] = useState([]);

    useEffect(() => {
        const { partner_id } = props.match.params;
        const payload = {
            partnerId: Number(partner_id),
            date: scheduleDate
        };
        props.getPartnerScheduleList(payload);
        setScheduleData(props.schedules);
    }, [props.match.params, scheduleDate]);

    // useEffect(() => {
    //     const { partner_id } = props.match.params;
    //     const payload = {
    //         partnerId: Number(partner_id),
    //         date: scheduleDate
    //     };
    //     props.getPartnerScheduleList(payload);
    //     setScheduleData(props.schedules);
    // }, [scheduleDate]);

    const onDeleteSchedule = () => {
        const payload = {
            partnerId: 28,
            scheduleId: 24
        };
        props.deletePartnerSchedule(payload);
    };

    const onPostschedule = () => {
        const { partner_id } = props.match.params;
    
        const _payload = {
            partnerId: Number(partner_id),
            schedules: calenderValues,
            date:scheduleDate
        };
        props.postPartnerSchedule(_payload);
        setCalenderValues([]);
    };

    const onChangeCalenderData = (calenderValue) => {
        let _calenderValues = calenderValues.slice();
        if (calenderValues.includes(calenderValue["startedAt"])) {
            _calenderValues = calenderValues.filter((el) => {
                if (el["startedAt"] !== calenderValue["startedAt"]) {
                    DeduplicationInArrContent(calenderValues);
                }
            });
        } else {
            _calenderValues.push(calenderValue["startedAt"]);
        }
        setCalenderValues(_calenderValues);
    };

    const times = [
        { startedAt: `${scheduleDate} 00:00:00`, btnView: "00:00AM - 00:30AM" },
        { startedAt: `${scheduleDate} 00:30:00`, btnView: "00:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 01:00:00`, btnView: "01:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 01:30:00`, btnView: "01:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 02:00:00`, btnView: "02:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 02:30:00`, btnView: "02:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 03:00:00`, btnView: "03:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 03:30:00`, btnView: "03:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 04:00:00`, btnView: "04:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 04:30:00`, btnView: "04:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 05:00:00`, btnView: "05:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 05:30:00`, btnView: "05:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 06:00:00`, btnView: "06:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 06:30:00`, btnView: "06:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 07:00:00`, btnView: "07:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 07:30:00`, btnView: "07:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 08:00:00`, btnView: "08:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 08:30:00`, btnView: "08:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 09:00:00`, btnView: "09:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 09:30:00`, btnView: "09:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 10:00:00`, btnView: "10:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 10:30:00`, btnView: "10:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 11:00:00`, btnView: "11:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 11:30:00`, btnView: "11:30AM - 01:00AM" },
        { startedAt: `${scheduleDate} 12:00:00`, btnView: "12:00PM - 12:30PM" },
        { startedAt: `${scheduleDate} 12:30:00`, btnView: "12:30AM - 01:00PM" },
        { startedAt: `${scheduleDate} 13:00:00`, btnView: "01:00PM - 01:30PM" },
        { startedAt: `${scheduleDate} 13:30:00`, btnView: "01:30PM - 02:00PM" },
        { startedAt: `${scheduleDate} 14:00:00`, btnView: "02:00PM - 02:30PM" },
        { startedAt: `${scheduleDate} 14:30:00`, btnView: "02:30PM - 03:00PM" },
        { startedAt: `${scheduleDate} 15:00:00`, btnView: "03:00PM - 03:30PM" },
        { startedAt: `${scheduleDate} 15:30:00`, btnView: "03:30PM - 04:00PM" },
        { startedAt: `${scheduleDate} 16:00:00`, btnView: "04:00PM - 04:30PM" },
        { startedAt: `${scheduleDate} 16:30:00`, btnView: "04:30PM - 05:00PM" },
        { startedAt: `${scheduleDate} 17:00:00`, btnView: "05:00PM - 05:30PM" },
        { startedAt: `${scheduleDate} 17:30:00`, btnView: "05:30PM - 06:00PM" },
        { startedAt: `${scheduleDate} 18:00:00`, btnView: "06:00PM - 06:30PM" },
        { startedAt: `${scheduleDate} 18:30:00`, btnView: "06:30PM - 07:00PM" },
        { startedAt: `${scheduleDate} 19:00:00`, btnView: "07:00PM - 07:30PM" },
        { startedAt: `${scheduleDate} 19:30:00`, btnView: "07:30PM - 08:00PM" },
        { startedAt: `${scheduleDate} 20:00:00`, btnView: "08:00PM - 08:30PM" },
        { startedAt: `${scheduleDate} 20:30:00`, btnView: "08:30PM - 09:00PM" },
        { startedAt: `${scheduleDate} 21:00:00`, btnView: "09:00PM - 09:30PM" },
        { startedAt: `${scheduleDate} 21:30:00`, btnView: "09:30PM - 10:00PM" },
        { startedAt: `${scheduleDate} 22:00:00`, btnView: "10:00PM - 10:30PM" },
        { startedAt: `${scheduleDate} 22:30:00`, btnView: "10:30PM - 11:00PM" },
        { startedAt: `${scheduleDate} 23:00:00`, btnView: "11:00PM - 11:30PM" },
        { startedAt: `${scheduleDate} 23:30:00`, btnView: "11:30PM - 00:00AM" }
    ];

    console.log(calenderValues, "calenderValues");
    console.log(scheduleData, "scheduleData");

    return (
        <div className="scheduler_box">
            {props.location.pathname.includes("schedule_management") && (
                <div className="top_box flex_box between">
                    <p className="today">
                        일정 선택 캘린더
                        <input
                            type="date"
                            value={scheduleDate}
                            min={moment().format("YYYY-MM-DD")}
                            onChange={(e) => setScheduleDate(e.target.value)}
                        ></input>
                    </p>
                    <div className="date_pick_box"></div>
                    <div className="btn_box">
                        <button
                            className="cancel_btn"
                            onClick={onDeleteSchedule}
                        >
                            일정 취소
                        </button>
                        <button className="save_btn" onClick={onPostschedule}>
                            일정 추가
                        </button>
                    </div>
                </div>
            )}
            <div className="select_times_box">
                <div className="legend_box">
                    <span className="non_selected">상담 불가</span>
                    <span className="reserve_able">상담 가능</span>
                    <span className="reserved">이미 예약 됨</span>
                </div>
                {times.map((el, key) => {
                    if (!calenderValues.includes(el["startedAt"])) {
                        return (
                            <button
                                value={calenderValues}
                                onClick={() => onChangeCalenderData(el)}
                                key={key}
                            >
                                {el.btnView}
                            </button>
                        );
                    }
                    if (calenderValues.includes(el["startedAt"])) {
                        return (
                            <button
                                value={calenderValues}
                                onClick={() => onChangeCalenderData(el)}
                                key={key}
                                className="selected"
                            >
                                {el.btnView}
                            </button>
                        );
                    }
                })}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        schedules: state.schedule.schedules
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPartnerScheduleList: (payload) =>
            dispatch(scheduleActions.getPartnerScheduleList(payload)),
        postPartnerSchedule: (payload) =>
            dispatch(scheduleActions.postPartnerSchedule(payload)),
        deletePartnerSchedule: (payload) =>
            dispatch(scheduleActions.deletePartnerSchedule(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
