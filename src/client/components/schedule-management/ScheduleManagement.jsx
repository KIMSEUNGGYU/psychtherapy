import React, { useEffect, useState } from "react";
import "./ScheduleManagement.scss";
import { SchedulerDay } from "client/components";
import moment from "moment";

const ScheduleManagement = props => {
    const { partner_id } = props.match.params;
    const [times, setTimes] = useState([]);
    const [scheduleArr, setScheduleArr] = useState([])

    const [day, setDay] = useState("mon")
    const m = moment();
    useEffect(() => {
        const payload = {
            partnerId: Number(partner_id),
            day,
        };
        props.getPartnerScheduleList(payload);
    }, []);

    useEffect(() => {
        const payload = {
            partnerId: Number(partner_id),
            day
        };
        props.getPartnerScheduleList(payload);
    }, [day]);

    useEffect(() => {
        setScheduleArr(props.schedules);
    }, [props.schedules]);

    useEffect(() => {
        if (props.schedules) {
            const schedule=[];
            for (let i = 0; i < 48; i++) {
                const startedAt = moment(m.format("YYYY-MM-DD"))
                    .utcOffset("+0900")
                    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                    .add(i * 30, "minutes")
                    .format("YYYY-MM-DD HH:mm:ss");
                let obj = {
                    startedAt,
                    reservation: 2,
                };
                scheduleArr.forEach(el => {
                    if (el.time === startedAt.slice(-8)) {
                        obj["reservation"] = 0;
                    }
                    delete el.scheduleId;
                });
                schedule.push(obj);
            }
            setTimes(schedule);
        }
    }, [scheduleArr]);

    const onClickSave = (scheduleArr) => {
        //props.deletePartnerSchedule({partnerId: Number(partner_id),day});
        props.postPartnerSchedule({partnerId: Number(partner_id),schedules: scheduleArr, day});
    };
    const schedulerProps = {
        schedules: props.schedules,
        userType: "partner",
        times,
        scheduleArr,
        setScheduleArr,
        day,
        setDay,
        onClickSave
    };
    return (
        <div className="container schedule_management">
            <div className="layout">
                <SchedulerDay {...schedulerProps} />
            </div>
        </div>
    );
};

export default ScheduleManagement;
