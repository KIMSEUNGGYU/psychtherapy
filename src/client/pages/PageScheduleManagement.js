import { connect } from "react-redux";
import { ScheduleManagement } from "client/components";
import { actions as partnersActions } from "client/modules/partners";
import { actions as scheduleActions } from "client/modules/schedule";

const mapStateToProps = (state) => ({
    partner: state.partners.partner,
    schedules:state.schedule.schedules
});

const mapDispatchToProps = (dispatch) => ({
    getPartner: (payload) => dispatch(partnersActions.getPartner(payload)),
    postPartnerSchedule: (payload) => dispatch(scheduleActions.postPartnerSchedule(payload)),
    deletePartnerSchedule: (payload) => dispatch(scheduleActions.deletePartnerSchedule(payload)),
    getPartnerScheduleList:(payload) => dispatch(scheduleActions.getPartnerScheduleList(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManagement);
