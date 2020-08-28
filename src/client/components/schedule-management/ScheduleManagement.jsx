import React from "react";
import "./ScheduleManagement.scss";
import { Scheduler } from "client/components";

const ScheduleManagement = (props) => {
    console.log(props,"?1??")
    return (
        <div className="container schedule_management">
            <div className="layout">
                <Scheduler {...props} />
            </div>
        </div>
    );
};

export default ScheduleManagement;
