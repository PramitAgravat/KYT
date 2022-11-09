import React, { Component } from 'react';
import ProfileView from './ProfileView';
import { connect } from 'react-redux';
import * as authActions from "app/actions/authActions";
import * as profileActions from "app/actions/profileActions";
class ProfileViewContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <ProfileView {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        userProfile: state.authReducer.mainUser,
    };
}
function mapDispatchToProps(dispatch) {
    return {

        changeSendMeAlert: (data) => dispatch(profileActions.changeSendMeAlert(data)),
        changeEmailEnable: (data) => dispatch(profileActions.changeEmailEnable(data)),
        logout: () => dispatch(authActions.onAuthReset())
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileViewContainer);
