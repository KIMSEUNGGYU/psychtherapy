import { connect } from "react-redux";
import { Counselor } from "client/components";
import { actions as partnersActions } from "client/modules/partners";
import { actions as pointActions } from "client/modules/point";
import { actions as userActions } from "client/modules/user";

const mapStateToProps = (state) => ({
    partner: state.partners.partner,
    user: state.user.user
});

const mapDispatchToProps = (dispatch) => ({
    getPartner: (payload) => dispatch(partnersActions.getPartner(payload)),
    putPurchasePoint: (payload) =>
        dispatch(pointActions.putPurchasePoint(payload)),
    getUser: () => dispatch(userActions.getUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Counselor);
