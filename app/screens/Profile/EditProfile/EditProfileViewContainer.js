import React, { Component } from 'react';
import EditProfile from './EditProfile';
import { connect } from 'react-redux';
import * as profileActions from "app/actions/profileActions";
class EditProfileViewContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <EditProfile {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        // userProfile: state.userProfileReducer.uesrProfile,
        // updateUserProfile: state.userProfileReducer.updateProfile
        userProfile: state.authReducer.mainUser,
        loader: state.globalReducer.is_visible,
        profileError: state.profileReducer.errors,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        // getUserProfile: () => dispatch(userProfileActions.getUserProifle()),
        // updateUserProfile: (data) => dispatch(userProfileActions.requestUpdateProfile(data)),
        // getUserProfile: () => dispatch(authActions.onLoginSuccess()),
        updateProfile: (data) => dispatch(profileActions.updateProfile(data)),
        updateProfilePic: (data) => dispatch(profileActions.updateProfilePic(data)),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProfileViewContainer);
