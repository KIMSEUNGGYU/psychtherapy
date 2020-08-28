import { connect } from "react-redux";
import { Pricing } from "client/components";
import { actions as userActions } from "client/modules/user";
import { actions as pointActions } from "client/modules/point";

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(userActions.getUser()),
        putChargePoint: (payload) =>
            dispatch(pointActions.putChargePoint(payload)),
        putPurchasePoint: (payload) =>
            dispatch(pointActions.putPurchasePoint(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
