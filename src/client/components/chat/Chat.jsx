import React, { useState, useEffect } from "react";
import "./Chat.scss";
import { connect } from "react-redux";
import { actions as chatActions } from "client/modules/chat";

const Chat = (props) => {
    const [user, setUser] = useState("");
    const [content, setContent] = useState("");

    const onClickEnter = () => {
        console.log(
            props.enterRoom({
                id: "room1",
                user
            })
        );
        props.enterRoom({
            id: "room1",
            user
        });
    };

    const onSubmit = () => {
        const payload = {
            content: content,
            user,
            id: "room1"
        };
        props.sendMessage(payload);
        setContent("");
    };

    const onKeyPress = (e) => {
        if (e.charCode === 13) {
            onSubmit();
        }
    };
    console.log(props.room);
    return (
        <div className="chat_box">
            {!props.room.id ? (
                <div>
                    <p>이름</p>
                    <br />
                    <input
                        type="text"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <br />
                    <br />

                    <p>방 ID</p>
                    <br />
                    <input type="text" name="id" value={"room1"} readOnly />
                    <br />
                    <br />
                    <button onClick={onClickEnter}>입장</button>
                </div>
            ) : (
                ""
            )}

            {props.room.id ? (
                <div>
                    <ul>
                        {props.room.messages.map((el, key) => {
                            return (
                                <li key={key}>
                                    user: {el.user}
                                    <br />
                                    content: {el.content}
                                    <br />
                                    at: {el.at}
                                    <br />
                                </li>
                            );
                        })}
                    </ul>
                    <input
                        type="text"
                        value={content}
                        onKeyPress={onKeyPress}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button onClick={onSubmit}>전송</button>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        room: state.chat.room
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        enterRoom: (payload) => dispatch(chatActions.enterRoom(payload)),
        sendMessage: (payload) => dispatch(chatActions.sendMessage(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
