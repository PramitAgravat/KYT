import React, { Component } from 'react';
import NotificationView from './NotificationView';
import { connect } from 'react-redux';
import * as notificationActions from "../../../app/actions/notificationActions";

class NotificationContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <NotificationView {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        // status: state.notificationReducer.isAuth,
        // notificationError: state.notificationReducer.errors,
        // loader: state.globalReducer.is_visible,
        notificationList: state.notificationReducer.notificationDataList
    };
}
function mapDispatchToProps(dispatch) {
    return {
        callGetNotification: () => dispatch(notificationActions.requestNotification())
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationContainer);
