import React, { Component } from 'react';
import UpdateDoctorAppointmentView from './UpdateDoctorAppointmentView';
import { connect } from 'react-redux';
import * as doctorAppointmentActions from "app/actions/doctorAppointmentActions";
class UpdateDoctorAppointmentContainer extends Component {
    render() {
        return <UpdateDoctorAppointmentView {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        diseaseList: state.doctorAppointmentReducer.diseaseList,
        doctorAppointment: state.doctorAppointmentReducer.doctorAppointment,
        updateDoctorAppointmentResponse: state.doctorAppointmentReducer.addFeeling
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getDiseasesList: () => dispatch(doctorAppointmentActions.getDiseasesList()),
        getDoctorAppointment: (data) => dispatch(doctorAppointmentActions.getDoctorAppointment(data)),
        updateDoctorAppointment: (data) => dispatch(doctorAppointmentActions.requestUpdateDoctorAppointment(data)),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateDoctorAppointmentContainer);
