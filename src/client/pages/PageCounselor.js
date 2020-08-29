import { connect } from "react-redux";
import { Counselor } from "client/components";
import { actions as partnersActions } from "client/modules/partners";
import { actions as scheduleActions } from "client/modules/schedule";

const mapStateToProps = (state) => ({
    partner: state.partners.partner,
    schedules: state.schedule.schedules
});

const mapDispatchToProps = (dispatch) => ({
    getPartner: (payload) => dispatch(partnersActions.getPartner(payload)),
    getPartnerScheduleList: (payload) =>
        dispatch(scheduleActions.getPartnerScheduleList(payload)),
    postPartnerSchedule: (payload) =>
        dispatch(scheduleActions.postPartnerSchedule(payload)),
    deletePartnerSchedule: (payload) =>
        dispatch(scheduleActions.deletePartnerSchedule(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Counselor);
