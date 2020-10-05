import React, { useEffect, useState } from "react";
import "./ScheduleManagement.scss";
import { Scheduler } from "client/components";
import moment from "moment";

const ScheduleManagement = props => {
    const { partner_id } = props.match.params;
    const [times, setTimes] = useState([]);
    const [scheduleDate, setScheduleDate] = useState(
        moment().format("YYYY-MM-DD")
    );
    const m = moment();
    useEffect(() => {
        const payload = {
            partnerId: Number(partner_id),
            date: moment().format("YYYY-MM-DD")
        };
        props.getPartnerScheduleList(payload);
    }, []);

    useEffect(() => {
        const payload = {
            partnerId: Number(partner_id),
            date: scheduleDate
        };
        props.getPartnerScheduleList(payload);
    }, [scheduleDate]);

    useEffect(() => {
        if (props.schedules) {
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
                props.schedules.forEach(el => {
                    if (m.valueOf() > moment(startedAt)) {
                        obj["reservation"] = 3;
                    } else if (el.startedAt === startedAt) {
                        obj["reservation"] = el.reservation;
                        obj["scheduleId"] = el.scheduleId;
                    }
                });
                scheduleArr.push(obj);
            }
            setTimes(scheduleArr);
        }
    }, [props.schedules, scheduleDate]);

    const onClickSave = (edit, schedules) => {
        if (edit === "delete") {
            schedules.forEach(scheduleId => {
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
        <div className="container schedule_management">
            <div className="layout">
                <Scheduler {...schedulerProps} />
            </div>
        </div>
    );
};

export default ScheduleManagement;
