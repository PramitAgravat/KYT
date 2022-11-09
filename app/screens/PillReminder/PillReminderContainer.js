import React, { Component } from 'react';
import PillReminderView from './PillReminderView';
import { connect } from 'react-redux';
import * as pillReminderActions from "app/actions/pillReminderActions";
class PillReminderContainer extends Component {
    render() {
        return <PillReminderView {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        pillReminderList: state.pillReminderReducer.pillReminderList
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getPillReminderList: () => dispatch(pillReminderActions.requestPillReminder()),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PillReminderContainer);
