import React from "react";
import "./CounselingPayment.scss";
import { Scheduler } from "client/components";

const CounselingPayment = () => {
    return (
        <div className="container counseling_payment">
            <div className="layout">
                <Scheduler />
                <div className="payment_box">
                    <span className="total">TOTAL POINT</span>
                    <span className="point">5 POINT</span>
                </div>
            </div>
        </div>
    );
};

export default CounselingPayment;
