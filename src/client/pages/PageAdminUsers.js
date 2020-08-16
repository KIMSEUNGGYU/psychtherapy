import { connect } from "react-redux";
import { AdminUsers } from "client/components";
import { actions as adminActions } from "client/modules/admin";

const mapStateToProps = (state) => {
    return {
        users: state.admin.users,
        total: state.admin.usersTotal
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: (payload) => dispatch(adminActions.getUsers(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
