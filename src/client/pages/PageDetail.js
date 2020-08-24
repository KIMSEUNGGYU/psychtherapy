import { connect } from "react-redux";
import { Detail } from "client/components";
import { actions as partnersActions } from "client/modules/partners";
import { actions as userActions } from "client/modules/user";



const mapStateToProps = (state) => { 
    return {
        token: state.auth.token,
        type: state.auth.type,
        user: state.user.user,
        partner: state.partners.partner
}; };

const mapDispatchToProps = (dispatch) => { return {
    getPartner: (payload) => dispatch(partnersActions.getPartner(payload)),
    getUser: (payload) => dispatch(userActions.getUser(payload))
}; };

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
