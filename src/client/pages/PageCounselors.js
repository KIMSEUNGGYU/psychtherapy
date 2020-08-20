import { connect } from "react-redux";
import { Counselors } from "client/components";
import { actions as partnersActions } from "client/modules/partners";

const mapStateToProps = (state) => ({
    partners: state.partners.partners,
    total: state.partners.partnersTotal
});

const mapDispatchToProps = (dispatch) => ({
    getPartners: (payload) => dispatch(partnersActions.getPartners(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Counselors);
