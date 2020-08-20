import { connect } from "react-redux";
import { Counselor } from "client/components";
import { actions as partnersActions } from "client/modules/partners";

const mapStateToProps = (state) => ({
    partner: state.partners.partner
});

const mapDispatchToProps = (dispatch) => ({
    getPartner: (payload) => dispatch(partnersActions.getPartner(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Counselor);
