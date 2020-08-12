import React from "react";
import "./ScheduleManagement.scss";
import { Scheduler } from "client/components";

const ScheduleManagement = () => {
    return (
        <div className="container schedule_management">
            <div className="layout">
                <Scheduler />
            </div>
        </div>
    );
};

export default ScheduleManagement;
