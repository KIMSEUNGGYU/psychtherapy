import { connect } from "react-redux";
import { AdminPartners } from "client/components";
import { actions as adminActions } from "client/modules/admin";

const mapStateToProps = (state) => {
    return {
        partners: state.admin.partners,
        total: state.admin.partnersTotal
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPartners: (payload) => dispatch(adminActions.getPartners(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPartners);
