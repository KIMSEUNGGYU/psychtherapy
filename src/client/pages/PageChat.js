import { connect } from "react-redux";
import { Chat } from "client/components";
import { actions as partnersActions } from "client/modules/partners";
import { actions as userActions } from "client/modules/user";
import { actions as chatActions } from "client/modules/chat";
import { actions as scheduleActions } from "client/modules/schedule";

const mapStateToProps = (state) => ({
    partner: state.partners.partner,
    user: state.user.user,
    room: state.chat.room,
    note: state.schedule.note,
});

const mapDispatchToProps = (dispatch) => ({
    getPartner: (payload) => dispatch(partnersActions.getPartner(payload)),
    getUser: () => dispatch(userActions.getUser()),
    enterRoom: (payload) => dispatch(chatActions.enterRoom(payload)),
    getRoom: (payload) => dispatch(chatActions.getRoom(payload)),
    leaveRoom: () => dispatch(chatActions.leaveRoom()),
    sendMessage: (payload) => dispatch(chatActions.sendMessage(payload)),
    getPartnerNote: (payload) => dispatch(scheduleActions.getPartnerNote(payload)),
    putPartnerNote: (payload) => dispatch(scheduleActions.putPartnerNote(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
