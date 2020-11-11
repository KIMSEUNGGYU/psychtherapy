import React, { useState, useEffect, useRef } from "react";
import "./Chat.scss";
import { getUserType } from "client/others/token";
import { MdComment } from "react-icons/md";
import moment from "moment";

const ChatLog = props => {
    const { room_id: id, user_id } = props.match.params;
    const type = getUserType();
    const [toggle, setToggle] = useState(false);

    const [note,setNote] = useState('');

    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            const { height } = ref.current.getBoundingClientRect();
            ref.current.scrollTop = height;
        }
    }, [ref]);
    useEffect(() => {
        props.getRoom({
            roomId: id
        });
        if (type === 1) {
            props.getPartnerNote({
                roomId: id,
            });
        }
    }, []);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
        let found_me=false;
        let found_opponent=false;
        let messages = [];
        if (props.room) { messages = props.room.messages; }
        for(let i=0;i<messages.length;i++) {
            if (messages[i].user===user_id) {
                if (type===0) {
                    props.getUser1()
                }
                else if (type === 1) {
                    props.getPartner({ partnerId: user_id });
                }
                found_me = true;
            }
            else {
                if (type===1) {
                    props.getUser2({ userId: messages[i].user, partnerId: user_id })
                }
                else if (type === 0) {
                    props.getPartner({ partnerId: user_id });
                }
                found_opponent = true;
            }
            if(found_me && found_opponent) { break; }
        }
    }, [ref, props.room]);

    useEffect(() => {
        if (props.note) {
            setNote(props.note.note? props.note.note : '');
        }
    }, [props.note]);
    // 수정

    const onClickToggle = () => {
        setToggle(!toggle);
    };

    const onClickLeave = () => {
        props.leaveRoom();
        props.history.push("/detail");
    };

    const onSaveNote = () => {
        props.putPartnerNote({roomId: id, note})
        props.leaveRoom();
        props.history.push("/detail");
    }

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
                            <li onClick={onClickLeave}>채팅방 나가기</li>
                        </ul>
                    </div>
                )}
            </div>
            <div className={`chat_contents_box ${`full ${type===1 ? 'partner' : 'user'}`}`}>
                <div className={`contents ${`full ${type===1 ? 'partner' : 'user'}`}`}>
                    <div className="contents title">
                        <h1>상담 내역</h1>
                    </div> 
                    <ul>
                        {props.room.messages.map((el, key) => {
                            const me = user_id === el.user;
                            const my_name = type ===1 ? props.partner.name : props.user.name;
                            const opponent_name = type ===1 ? props.user.name : props.partner.name;
                            return (
                                <li
                                    key={key}
                                    className='log'
                                >
                                    <p className="content">
                                        {`${me? my_name : opponent_name}: ${el.content}`}
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
            </div>
            {
                type===1 &&
                <div className="chat_note full">

                    <div className="enter_box">
                        <button className="button" onClick={()=>onSaveNote()}>
                            저장하고 뒤로가기
                        </button>
                    </div>

                    <div>
                        <ul style={{ display: 'flex', justifyContent:'center' }}>
                            상담 노트
                        </ul>
                        <div ref={ref} />
                    </div>
                    <p className="content">
                        <textarea defaultValue={note} onChange={(e)=>setNote(e.target.value)}/>
                    </p>
                </div>
            }
        </div>
    );
};

export default ChatLog;
