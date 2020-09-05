import React from "react";
import "./InfoBox.scss";

const InfoBox = (props) => {
    const { label, value } = props;
    return (
        <div className="info_box">
            <ul>
                {Object.keys(label).map((el, key) => {
                    return (
                        <li className="info_item">
                            <span className="label">{label[el]}</span>
                            <span className="data">{value[el]}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default InfoBox;
