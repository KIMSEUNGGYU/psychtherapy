import React, { useState, useEffect } from "react";
import "./Chat.scss";
import { getUserType } from "client/others/token";
import { MdComment } from "react-icons/md";

const Chat = (props) => {
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
            user: user.email,
            id
        };
        props.sendMessage(payload);
        setContent("");
    };

    const onKeyPress = (e) => {
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
            <div className="users_box"></div>
            <div className="chat_contents_box">
                <ul>
                    {props.room.messages.map((el, key) => {
                        console.log(user, el.user);
                        const me = user.email === el.user;
                        return (
                            <li
                                key={key}
                                className={`${me ? "right" : "left"}`}
                            >
                                <br />
                                content: {el.content}
                                <br />
                                at: {el.at}
                                <br />
                            </li>
                        );
                    })}
                </ul>
                <div className="enter_box">
                    <input
                        type="text"
                        value={content}
                        onKeyPress={onKeyPress}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="메세지를 입력하세요"
                    />
                    <button onClick={onSubmit}>전송</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
