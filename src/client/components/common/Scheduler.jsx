import React, { useEffect, useState } from "react";
import "./Scheduler.scss";
import moment from "moment";
import { history } from "client/store";

const Scheduler = (props) => {
    const [schedules, setSchedules] = useState(props.times);
    const [edit, setEdit] = useState(false);
    const [deletedArr, setDeletedArr] = useState([]);
    const [enteredArr, setEnteredArr] = useState([]);

    useEffect(() => {
        if (props.times.length) {
            setSchedules(props.times);
        }
    }, [props.times]);

    const onClickEdit = (key) => {
        setEdit(key);
        if (key === "enter") {
            setDeletedArr([]);
        }
    };

    const onClickTime = (startedAt, scheduleId) => {
        if (props.userType === "partner") {
            if (edit === "delete") {
                const filterArr = enteredArr.filter((el) => {
                    return el !== startedAt;
                });
                setEnteredArr(filterArr);
                setDeletedArr(deletedArr.concat(scheduleId));
            } else {
                setEnteredArr(enteredArr.concat(startedAt));
            }
        } else {
            props.setReservedId(scheduleId);
        }
    };

    const onClickSave = () => {
        if (edit === "enter") {
            props.onClickSave(edit, enteredArr);
        } else {
            props.onClickSave(edit, deletedArr);
        }
    };

    return (
        <div className="scheduler_box">
            {history.location.pathname.includes("schedule") && (
                <div className="top_box flex_box between">
                    <p className="today">
                        일정 선택 캘린더
                        <input
                            type="date"
                            value={props.scheduleDate}
                            min={moment().format("YYYY-MM-DD")}
                            onChange={(e) =>
                                props.setScheduleDate(e.target.value)
                            }
                        ></input>
                    </p>
                    <div className="date_pick_box"></div>
                    <div className="btn_box">
                        <button
                            className={`${edit === "delete" && "active"}`}
                            onClick={() => onClickEdit("delete")}
                        >
                            일정 삭제
                        </button>
                        <button
                            className={`${edit === "enter" && "active"}`}
                            onClick={() => onClickEdit("enter")}
                        >
                            일정 등록
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
                {schedules.map((el, key) => {
                    console.log(el.reservation,"reservation")
                    return (
                        <button
                            className={`${
                                props.userType === "partner"
                                    ? el.reservation === 1
                                        ? "selected"
                                        : (el.reservation === 0 ||
                                              enteredArr.includes(
                                                  el.startedAt
                                              )) &&
                                          !deletedArr.includes(el.scheduleId)
                                        ? "reserve_able"
                                        : ""
                                    : props.reservedId === el.scheduleId
                                    ? "selected"
                                    : el.reservation === 0
                                    ? "reserve_able"
                                    : el.reservation === 1
                                    ? "reserved"
                                    : ""
                            }`}
                            disabled={
                                el.reservation === 3 ||
                                (props.userType === "partner"
                                    ? el.reservation === 1 ||
                                      !edit ||
                                      (edit === "delete" &&
                                          el.reservation === 2) ||
                                      (edit === "enter" && el.reservation === 0)
                                    : el.reservation !== 0)
                            }
                            onClick={() => {
                                onClickTime(el.startedAt, el.scheduleId);
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
                    <button disabled={!edit} onClick={onClickSave}>
                        저장하기
                    </button>
                </div>
            )}
        </div>
    );
};
export default Scheduler;
