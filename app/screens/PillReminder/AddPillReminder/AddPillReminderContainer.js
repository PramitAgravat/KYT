import React, { Component } from 'react';
import AddPillReminderView from './AddPillReminderView';
import { connect } from 'react-redux';
import * as pillReminderActions from "app/actions/pillReminderActions";

class AddPillReminderContainer extends Component {
    render() {
        return <AddPillReminderView {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        medicineType: state.pillReminderReducer.medicineType,
        loader: state.globalReducer.is_visible
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getPillReminderList: () => dispatch(pillReminderActions.requestMedicineList()),
        addPillReminder: (data)=>dispatch(pillReminderActions.requestAddPillReminder(data))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPillReminderContainer);
