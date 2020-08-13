import React from "react";
import "./Scheduler.scss";

const Scheduler = () => {
    const times = [
        "00:00AM - 00:30AM",
        "00:30AM - 01:00AM",
        "01:00AM - 01:30AM",
        "01:30AM - 02:00AM",
        "02:00AM - 02:30AM",
        "02:30AM - 03:00AM",
        "03:00AM - 03:30AM",
        "03:30AM - 04:00AM",
        "04:00AM - 04:30AM",
        "04:30AM - 05:00AM",
        "05:00AM - 05:30AM",
        "05:30AM - 06:00AM",
        "06:00AM - 06:30AM",
        "06:30AM - 07:00AM",
        "07:00AM - 07:30AM",
        "07:30AM - 08:00AM",
        "08:00AM - 08:30AM",
        "08:30AM - 09:00AM",
        "09:00AM - 09:30AM",
        "09:30AM - 10:00AM",
        "11:00AM - 11:30AM",
        "11:30AM - 12:00PM",
        "12:00PM - 12:30PM",
        "12:30PM - 01:00PM",
        "01:00PM - 01:30PM",
        "01:30PM - 02:00PM",
        "02:00PM - 02:30PM",
        "02:30PM - 03:00PM",
        "03:00PM - 03:30PM",
        "03:30PM - 04:00PM",
        "04:00PM - 04:30PM",
        "04:30PM - 05:00PM",
        "05:00PM - 05:30PM",
        "05:30PM - 06:00PM",
        "06:00PM - 06:30PM",
        "06:30PM - 07:00PM",
        "07:00PM - 07:30PM",
        "07:30PM - 08:00PM",
        "08:00PM - 08:30PM",
        "08:30PM - 09:00PM",
        "09:00PM - 09:30PM",
        "09:30PM - 10:00PM",
        "11:00PM - 11:30PM",
        "11:30PM - 00:00AM"
    ];
    return (
        <div className="scheduler_box">
            <div className="top_box flex_box between">
                <p className="today">2020년 8월 12일 수요일</p>
                <div className="btn_box">
                    <button className="cancel_btn">취소하기</button>
                    <button className="save_btn">저장하기</button>
                </div>
            </div>
            <div className="select_times_box">
                <div className="legend_box">
                    <span className="non_selected">상담 불가</span>
                    <span className="selected">상담 가능</span>
                    <span className="reserved">이미 예약 됨</span>
                </div>
                {times.map((el, key) => {
                    return (
                        <button
                            key={key}
                            className={`${10 < key && 32 > key && "selected"} ${
                                16 === key && "reserved"
                            }`}
                        >
                            {el}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Scheduler;
