import React from "react";
import "./ScheduleManagement.scss";
import { Scheduler } from "client/components";

const ScheduleManagement = (props) => {
    return (
        <div className="container schedule_management">
            <div className="layout">
                <Scheduler {...props} />
            </div>
        </div>
    );
};

export default ScheduleManagement;
