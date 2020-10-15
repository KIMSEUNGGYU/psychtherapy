import { connect } from "react-redux";
import { Detail } from "client/components";
import { actions as partnersActions } from "client/modules/partners";
import { actions as userActions } from "client/modules/user";
import { actions as scheduleActions } from "client/modules/schedule";
import { actions as chatActions } from "client/modules/chat";

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        type: state.auth.type,
        user: state.user.user,
        partner: state.partners.partner,
        schedules: state.schedule.schedules
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPartner: (payload) => dispatch(partnersActions.getPartner(payload)),
        getPartnerScheduleList: (payload) =>
            dispatch(scheduleActions.getPartnerScheduleList(payload)),
        getUser: (payload) => dispatch(userActions.getUser(payload)),
        getUserInfo: (payload) => dispatch(partnersActions.getUserInfo(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
