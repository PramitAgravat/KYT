import React, { Component } from 'react';
import UpdatePillReminderView from './UpdatePillReminderView';
import { connect } from 'react-redux';
import * as pillReminderActions from "app/actions/pillReminderActions";

class UpdatePillReminderContainer extends Component {
    render() {
        return <UpdatePillReminderView {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        medicineType: state.pillReminderReducer.medicineType,
        loader: state.globalReducer.is_visible,
        pillReminder: state.pillReminderReducer.pillReminder,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getPillReminderList: () => dispatch(pillReminderActions.requestMedicineList()),
        getPillReminder: (data) => dispatch(pillReminderActions.getPillReminder(data)),
        updatePillReminder: (data)=>dispatch(pillReminderActions.requestUpdatePillReminder(data))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdatePillReminderContainer);
