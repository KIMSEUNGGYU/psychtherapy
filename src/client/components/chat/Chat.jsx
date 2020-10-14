import React, { useState, useEffect, useRef } from "react";
import "./Chat.scss";
import { getUserType } from "client/others/token";
import { MdComment, MdSend } from "react-icons/md";
import moment, { duration } from "moment";

const Chat = (props) => {
    const { room_id: id, user_id, started_at } = props.match.params;
    const type = getUserType();
    const status =
        moment().valueOf() < moment(started_at).add(30, "minutes").valueOf();
    const [content, setContent] = useState("");
    const [toggle, setToggle] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            const { height } = ref.current.getBoundingClientRect();
            ref.current.scrollTop = height;
        }
    }, [ref]);
    useEffect(() => {
        if (!status) {
            props.getRoom({
                roomId: id
            });
        } else {
            props.enterRoom({
                id,
                user: user_id
            });
        }
        if (type === 0) {
            props.getUser();
        } else if (type === 1) {
            props.getPartner({
                id: user_id
            });
        }
    }, []);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [ref, props.room]);

    const onSubmit = () => {
        const payload = {
            content: content,
            user: user_id,
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

    const onClickToggle = () => {
        setToggle(!toggle);
    };

    const onClickLeave = () => {
        props.leaveRoom();
        props.history.push("/detail");
    };

    const onClickAlert = () => {
        const remain =
            30 - Math.floor(moment().diff(moment(started_at)) / 60000);
        alert(`${remain}분 남았습니다`);
    };

    return (
        <div className="chat_box flex_box between">
            {/* <button onClick={onClickLeave}>나가기</button> */}
            <div className="chat_header">
                <button className="menu_btn" onClick={onClickToggle}>
                    <MdComment />
                </button>
                {toggle && (
                    <div className="toggle_box">
                        <ul>
                            {status && (
                                <li onClick={onClickAlert}>잔여 시간 확인</li>
                            )}
                            <li onClick={onClickLeave}>채팅방 나가기</li>
                        </ul>
                    </div>
                )}
            </div>
            <div className={`chat_contents_box full`}>
                <div className="contents">
                    <ul>
                        {props.room.messages.map((el, key) => {
                            const me = user_id === el.user;
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
                    <div ref={ref} />
                </div>
                {
                    <div className="enter_box">
                        <input
                            type="text"
                            value={content}
                            onKeyPress={onKeyPress}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={status && "메세지를 입력하세요"}
                            readOnly={!status}
                        />
                        <button className="submit_btn" onClick={onSubmit}>
                            <MdSend />
                        </button>
                    </div>
                }
            </div>
            {/* <div className={`chat_note ${status ? 'split' : 'full'}`}>
                {
                    !status &&
                    <div className="enter_box">
                        <button className="button">
                            저장하고 뒤로가기
                        </button>
                    </div>
                }
                <div>
                    <ul style={{ display: 'flex', justifyContent:'center' }}>
                        {
                            type===0 ? '자주 쓰는 문구' : '상담 노트'
                        }
                    </ul>
                    <div ref={ref} />
                </div>
                <p className="content">
                    <textarea
                    />
                </p>
                {
                    type===1 && status &&
                    <div className="enter_box">
                        <button className="button">
                            저장하기
                        </button>
                        <button className="button">
                            상담 예약
                        </button>
                    </div>
                }
            </div> */}
        </div>
    );
};

export default Chat;
