import * as types from './types';

export function getDoctorAppointment(data) {
    return {
        type: types.GET_DOCTOR_APPOINTMENT_REQUEST,
        data
    };
}

export function setDoctorAppointment(response) {
    console.log("ACTION setDoctorAppointment Action", response);
    return {
        type: types.SET_DOCTOR_APPOINTMENT,
        response
    };
}

export function updateDoctorAppointmentFailed(response) {
    return {
        type: types.UPDATE_DOCTOR_APPOINTMENT_FAILED,
        response
    };
}

export function updateDoctorAppointmentResponse(response) {
    return {
        type: types.UPDATE_DOCTOR_APPOINTMENT_RESPONSE,
        response
    };
}


export function requestUpdateDoctorAppointment(data) {
    return {
        type: types.UPDATE_DOCTOR_APPOINTMENT_REQUEST,
        data
    };
}

export function getDiseasesList() {
    return {
        type: types.DISEASE_LIST_REQUEST
    };
}

export function setDiseasesList(response) {
    return {
        type: types.SET_DISEASES_LIST,
        response
    };
}

export function addDoctorAppointmentFailed(response) {
    return {
        type: types.ADD_DOCTOR_APPOINTMENT_FAILED,
        response
    };
}

export function addDoctorAppointmentResponse(response) {
    return {
        type: types.ADD_DOCTOR_APPOINTMENT_RESPONSE,
        response
    };
}

export function addDoctorAppointmentSuccess(response) {
    return {
        type: types.ADD_DOCTOR_APPOINTMENT_SUCCESS,
        response
    };
}


export function requestAddDoctorAppointment(data) {
    return {
        type: types.ADD_DOCTOR_APPOINTMENT_REQUEST,
        data
    };
}