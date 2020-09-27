import { connect } from "react-redux";
import { Chat } from "client/components";
import { actions as partnersActions } from "client/modules/partners";
import { actions as userActions } from "client/modules/user";
import { actions as chatActions } from "client/modules/chat";

const mapStateToProps = (state) => ({
    partner: state.partners.partner,
    user: state.user.user,
    room: state.chat.room
});

const mapDispatchToProps = (dispatch) => ({
    getPartner: (payload) => dispatch(partnersActions.getPartner(payload)),
    getUser: () => dispatch(userActions.getUser()),
    enterRoom: (payload) => dispatch(chatActions.enterRoom(payload)),
    getRoom: (payload) => dispatch(chatActions.getRoom(payload)),
    leaveRoom: () => dispatch(chatActions.leaveRoom()),
    sendMessage: (payload) => dispatch(chatActions.sendMessage(payload)),
    outRoom: () => dispatch(chatActions.outRoom()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
