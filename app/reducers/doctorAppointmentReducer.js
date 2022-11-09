import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
    diseaseList: [],
    errors: [],
    addDoctorAppointmentResponse: [],
    doctorAppointment: [],
    updateDoctorAppointmentResponse: [],
    addDoctorAppointmentSuccess: false
};

export const doctorAppointmentReducer = createReducer(initialState, {

    [types.SET_DOCTOR_APPOINTMENT](state, action) {
        return {
            ...state,
            doctorAppointment: action.response ? action.response : []
        };
    },
    [types.UPDATE_DOCTOR_APPOINTMENT_REQUEST](state, action) {
        return {
            ...state,
            updateDoctorAppointmentResponse: action.response
        };
    },
    [types.UPDATE_DOCTOR_APPOINTMENT_FAILED](state, action) {
        return {
            ...state,
            errors: action
        };
    },
    [types.UPDATE_DOCTOR_APPOINTMENT_RESPONSE](state) {
        return {
            ...state,
        }
    },

    [types.SET_DISEASES_LIST](state, action) {
        return {
            ...state,
            diseaseList: action.response ? action.response : []
        };
    },
    [types.ADD_DOCTOR_APPOINTMENT_REQUEST](state, action) {
        return {
            ...state,
            addDoctorAppointmentResponse: action.response
        };
    },
    [types.ADD_DOCTOR_APPOINTMENT_SUCCESS](state, action) {
        return {
            ...state,
            addDoctorAppointmentSuccess: action.response
        };
    },
    [types.ADD_DOCTOR_APPOINTMENT_FAILED](state, action) {
        return {
            ...state,
            errors: action
        };
    },
    [types.ADD_DOCTOR_APPOINTMENT_RESPONSE](state) {
        return {
            ...state,
        }
    }
});

