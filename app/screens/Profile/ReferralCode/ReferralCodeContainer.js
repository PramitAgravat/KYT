import React, { Component } from 'react';
import ReferralCode from './ReferralCode';
import { connect } from 'react-redux';
class ReferralCodeContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <ReferralCode {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        userProfile: state.authReducer.mainUser,
    };
}
function mapDispatchToProps(dispatch) {
    return {
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReferralCodeContainer);
