import React, { Component } from 'react';
import AddDisease from './AddDisease';
import { connect } from 'react-redux';
import * as doctorAppointmentActions from "app/actions/doctorAppointmentActions";
import  * as addDiseaseActions from "app/actions/addDiseaseActions";
class AddDiseaseContainer extends Component {
    render() {
        return <AddDisease {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        diseaseList: state.doctorAppointmentReducer.diseaseList,
        diseaseError:state.addDiseaseReducer.errors,
        loader: state.globalReducer.is_visible,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getDiseasesList: () => dispatch(doctorAppointmentActions.getDiseasesList()),
        addDisease: (data) => dispatch(addDiseaseActions.requestAddDisease(data)),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDiseaseContainer);
