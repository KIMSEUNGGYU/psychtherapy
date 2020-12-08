import React, { useEffect, useState } from "react";
import "./Scheduler.scss";
import moment from "moment";
import { history } from "client/store";
import _ from "lodash-es";

const SchedulerDay = props => {
    const [schedules, setSchedules] = useState(props.times);
    const [edit, setEdit] = useState(false);
    useEffect(() => {
        if (props.times.length) {
            setSchedules(props.times);
        }
    }, [props.times]);
    

    const onClickTime = (startedAt) => {
        let arr = props.scheduleArr.slice();
        const data = {day: props.day, time: startedAt.slice(-8)};
        let idx=-1;
        for(let i=0; i<arr.length; i++) {
            if (_.isEqual(arr[i],data)) {
                idx = i;
                break;
            }
        }
        if(idx===-1) {
            arr.push(data);
        }
        else {
            arr.splice(idx,1);
        }
        props.setScheduleArr(arr);
    };


    const onClickDay = (d) => {
        props.setDay(d);
    }


    return (
        <div className="scheduler_box">
            <div className="top_box flex_box between">
                <p className="today">
                    일정 관리 캘린더
                    {
                        history.location.pathname.includes("schedule") &&
                        <>
                            <label><input type="checkbox" checked={props.day==="mon"} onChange={()=>onClickDay("mon")}/>월</label>
                            <label><input type="checkbox" checked={props.day==="tue"} onChange={()=>onClickDay("tue")}/>화</label>
                            <label><input type="checkbox" checked={props.day==="wed"} onChange={()=>onClickDay("wed")}/>수</label>
                            <label><input type="checkbox" checked={props.day==="thu"} onChange={()=>onClickDay("thu")}/>목</label>
                            <label><input type="checkbox" checked={props.day==="fri"} onChange={()=>onClickDay("fri")}/>금</label>
                            <label><input type="checkbox" checked={props.day==="sat"} onChange={()=>onClickDay("sat")}/>토</label>
                            <label><input type="checkbox" checked={props.day==="sun"} onChange={()=>onClickDay("sun")}/>일</label>
                        </>
                    }
                </p>
                <div className="date_pick_box"></div>
                {history.location.pathname.includes("schedule") && (
                    <div className="btn_box">
                        <button
                            className={`${edit === "delete" && "active"}`}
                        >
                            일정 삭제
                        </button>
                        <button
                            className={`${edit === "enter" && "active"}`}
                        >
                            일정 등록
                        </button>
                    </div>
                )}
            </div>
            <div className="select_times_box">
                {schedules.map((el, key) => {
                    return (
                        <button
                            className={`${
                                
                                   el.reservation === 0
                                    ? "reserve_able"
                                    : el.reservation === 1
                                    ? "reserved"
                                    : ""
                            }`}
                            disabled={
                                el.reservation === 3 
                            }
                            onClick={() => {
                                onClickTime(el.startedAt);
                            }}
                            key={key}
                        >
                            {moment(el.startedAt).format("HH:mm A")} -{" "}
                            {moment(el.startedAt)
                                .add(30, "minutes")
                                .format("HH:mm A")}
                        </button>
                    );
                })}
            </div>
            {history.location.pathname.includes("schedule") && (
                <div className="save_btn">
                    <button onClick={()=>props.onClickSave(props.scheduleArr)}>
                        저장하기
                    </button>
                </div>
            )}
        </div>
    );
};
export default SchedulerDay;
