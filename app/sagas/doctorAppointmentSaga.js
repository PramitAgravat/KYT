import React from 'react';
import { put, call, delay } from 'redux-saga/effects';

import { getDiseasesList, addDoctorAppointment, getDoctorAppointment, updateDoctorAppointment } from 'app/api/methods/doctorAppointment';
import * as doctorAppointmentActions from "app/actions/doctorAppointmentActions";
import * as globalActions from "app/actions/globalActions";
import { navigateToHomeandReset, navigateToLoginandReset, navigateToRxTimeline } from 'app/navigation/NavigationHelpers';
import * as authActions from '../actions/authActions';
import { Toast } from "native-base";
export const diseasesListFetch = function* diseasesListFetch(action) {
    try {
        const response = yield call(getDiseasesList);
        console.log("diseasesListFetch", response);
        yield put(doctorAppointmentActions.setDiseasesList(response.data.result));
    }
    catch (e) {

    }

}


export const addDoctorAppointmentSaga = function* addDoctorAppointmentSaga(action) {
    try {
        yield put(globalActions.enableLoader());
        const response = yield call(addDoctorAppointment, action.data);
        yield put(globalActions.disableLoader());
        if (response.data.status) {
            yield put(doctorAppointmentActions.addDoctorAppointmentSuccess(true));
            // alert("Add Appointment")
            // yield call(navigateToHomeandReset);
        } else
            yield put(doctorAppointmentActions.addDoctorAppointmentFailed(response.data.message));
    }
    catch (e) {

    }

}

export const getdoctorAppointment = function* getdoctorAppointment(action) {
    try {
        const response = yield call(getDoctorAppointment, action.data);
        console.log("Get setDoctorAppointment Response", response.data.result);
        yield put(doctorAppointmentActions.setDoctorAppointment(response.data.result));
    }
    catch (e) {

    }

}

export const updateDoctorAppointmentSaga = function* updateDoctorAppointmentSaga(action) {
    try {
        console.log(" updateDoctorAppointmentSaga 1", action);
        console.log(" updateDoctorAppointmentSaga 2", action.data);
        yield put(globalActions.enableLoader());
        const response = yield call(updateDoctorAppointment, action.data);
        yield put(globalActions.disableLoader());
        if (response.data.status) {
            //yield put(registerActions.onRegisterResponse(response.data));
            // alert("Add Appointment")
            yield call(navigateToRxTimeline);
        } else
            yield put(doctorAppointmentActions.updateDoctorAppointmentFailed(response.data.message));
    }
    catch (e) {

    }


}



