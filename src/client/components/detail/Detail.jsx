import React, { useState, useEffect } from "react";
import "./Detail.scss";
import { history } from "client/store";
import { getToken, parsingToken } from "client/others/token";

const Detail = (props) => {
    const [userInfo, setUserInfo] = useState({
        userId: null,
        type: null
    });

    useEffect(() => {
        const token = getToken();
        const parsedToken = parsingToken(token);
        if (token) {
            setUserInfo({
                userId: parsedToken.userId,
                type: parsedToken.type
            });
        }
    }, [props.token, props.type]);

    useEffect(() => {
        if (userInfo.type === 0) {
            props.getUser();
        } else if (userInfo.type === 1) {
            props.getPartner({ id: userInfo.userId });
        }
    }, [userInfo]);

    console.log(props.user, props.partner, "마이페이지 정보");

    return (
        <div className="container detail">
            <div className="layout">
                <p className="title">마이페이지</p>
                {userInfo.type === 1 && (
                    <button
                        className="schedule-btn"
                        onClick={() =>
                            history.push(
                                `schedule_management/${userInfo.userId}`
                            )
                        }
                    >
                        스케쥴 관리하기
                    </button>
                )}
            </div>
        </div>
    );
};

export default Detail;
