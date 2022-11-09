import Api from 'app/api';
import ApiConstants from '../ApiConstants';
export const getDiseasesList = function getDiseasesList() {
    return Api(
        ApiConstants.DISEASE_LIST,
        null,
        'get'
    );
}

export const addDoctorAppointment = function addDoctorAppointment(data) {
    return Api(
        ApiConstants.ADD_DOCTOR_APPOINTMENT,
        data,
        'post'
    );
}

export const getDoctorAppointment = function getDoctorAppointment(data) {
    console.log("Get Doctor Appointment", data)
    return Api(
        ApiConstants.GET_DOCTOR_APPOINTMENT,
        data,
        'post'
    );
}

export const updateDoctorAppointment = function updateDoctorAppointment(data) {
    return Api(
        ApiConstants.UPDATE_DOCTOR_APPOINTMENT,
        data,
        'post'
    );
}