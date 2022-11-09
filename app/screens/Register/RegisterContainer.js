import React, { Component } from 'react';
import RegisterView from './RegisterView';
import { connect } from 'react-redux';
import * as registerActions from 'app/actions/registerActions';

class RegisterContainer extends Component {
    render() {
        return <RegisterView {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
       // profileType :  state.registerReducer.profileTypes,
        registerError: state.registerReducer.errors,
        loader: state.globalReducer.is_visible,
        open_otp:state.registerReducer.open_otp,
    };
}
function mapDispatchToProps(dispatch) {
    return {
      //  getProfileType: () => dispatch(registerActions.getProfileType()),
        register: (data) => dispatch(registerActions.requestRegister(data)),
        sendOtp:(data) => dispatch(registerActions.requestOtp(data)),
        openOtp:(data)=>dispatch(registerActions.openOtp(data))

    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterContainer);
