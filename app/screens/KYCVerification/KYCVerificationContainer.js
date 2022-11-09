import React, { Component } from 'react';
import KYTVerificationView from './KYCVerificationView';
import { connect } from 'react-redux';
import * as kycVerificationAction from 'app/actions/kycVerificationAction';
class KYCVerificationContainer extends Component {
    render() {
        return <KYTVerificationView {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        userProfile: state.authReducer.mainUser,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        kycVerificationImage: (data) => dispatch(kycVerificationAction.kycVerificationImage(data)),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KYCVerificationContainer);
