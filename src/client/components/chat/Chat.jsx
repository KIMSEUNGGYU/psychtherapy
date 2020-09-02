import React, { useState, useEffect } from "react";
import "./Chat.scss";
import { getUserType } from "client/others/token";
import { MdComment, MdSend } from "react-icons/md";
import moment from "moment";

const Chat = props => {
    const { room_id: id, user_id } = props.match.params;
    const type = getUserType();
    const [content, setContent] = useState("");
    const [user, setUser] = useState(props.user);
    useEffect(() => {
        props.enterRoom({
            id,
            user: user_id
        });
        props.getRoom({
            roomId: id
        });
        if (type === 0) {
            props.getUser();
        } else if (type === 1) {
            props.getPartner({
                id: user_id
            });
        }
    }, []);

    useEffect(() => {
        if (type === 0) {
            setUser(props.user);
        } else {
            setUser(props.partner);
        }
    }, [props.partner, props.user]);

    const onSubmit = () => {
        const payload = {
            content: content,
            user: user.id,
            id
        };
        props.sendMessage(payload);
        setContent("");
    };

    const onKeyPress = e => {
        if (e.charCode === 13) {
            onSubmit();
        }
    };

    const onClickLeave = () => {
        props.leaveRoom();
    };

    return (
        <div className="chat_box flex_box between">
            {/* <button onClick={onClickLeave}>나가기</button> */}
            <div className="chat_header">
                <button className="menu_btn">
                    <MdComment />
                </button>
            </div>
            <div className="users_box">{props.room.users.length}명 접속 중</div>
            <div className="chat_contents_box">
                <div className="contents">
                    <ul>
                        {props.room.messages.map((el, key) => {
                            const me = user.id === Number(el.user);
                            return (
                                <li
                                    key={key}
                                    className={`message ${
                                        me ? "right" : "left"
                                    }`}
                                >
                                    <p className="content">
                                        {el.content}
                                        <br />
                                        <span className="date">
                                            {moment(el.at).format("A HH:mm")}
                                        </span>
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="enter_box">
                    <input
                        type="text"
                        value={content}
                        onKeyPress={onKeyPress}
                        onChange={e => setContent(e.target.value)}
                        placeholder="메세지를 입력하세요"
                    />
                    <button className="submit_btn" onClick={onSubmit}>
                        <MdSend />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
