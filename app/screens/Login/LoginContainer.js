import React, { Component } from 'react';
import LoginView from './LoginView';
import { connect } from 'react-redux';
import * as loginActions from 'app/actions/loginActions';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <LoginView {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        status: state.authReducer.isAuth,
        loginError: state.loginReducer.errors,
        loader: state.globalReducer.is_visible,
        loginSuccess: state.loginReducer.loginSuccess,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onLogin: (data) => dispatch(loginActions.requestLogin(data)),
        loginSuccessData: (data) => dispatch(loginActions.loginSuccess(data)),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
