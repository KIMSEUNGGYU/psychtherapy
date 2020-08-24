import React, {useState, useEffect} from "react";
import "./Detail.scss";
import { history } from "client/store";
import { parsingToken } from "client/others/token";


const Detail = (props) => {
    const [is_id, setId] = useState("")

    useEffect(() => {
        if(props.token) {
            return setId(parsingToken(props.token).userId)
        }
        if(props.type === 0) {
            return props.getUser()
        }
        if(props.type === 1) {
            return props.getPartner(is_id)
        }
        console.log(props.user, props.partner,"???")
    },[props.token])

    return (
        <div className="container detail">
        <div className="layout">
            <p className="title">마이페이지</p>
            {props.type === 1 && (
                <button className="schedule-btn" onClick={() =>
                    history.push(
                        `schedule_management/${is_id}`
                    )
                }>스케쥴 관리하기</button>
            )}
        </div>
    </div>
    );
};

export default Detail;
