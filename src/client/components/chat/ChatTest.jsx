import React, { useEffect } from "react";
import "./Chat.scss";
import { connect } from "react-redux";
import { actions as chatActions } from "client/modules/chat";

const ChatTest = (props) => {
    useEffect(() => {
        props.postChatUser({
            id: "zino",
            name: "김진오"
        });
    }, []);
    return <div className="chat_box"></div>;
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        postChatUser: (payload) => dispatch(chatActions.postChatUser(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatTest);
