import React, { Component } from 'react';
import ForgotPasswordView from './ForgotPasswordView';
import { connect } from 'react-redux';
import * as loginActions from 'app/actions/loginActions';

class ForgotPasswordContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <ForgotPasswordView {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {

    };
}
function mapDispatchToProps(dispatch) {
    return {

    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPasswordContainer);
