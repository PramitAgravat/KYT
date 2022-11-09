import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
    diseaseList:[],
    errors:[],
    addDoctorAppointmentResponse:[]
};

export const addDiseaseReducer = createReducer(initialState, {

    [types.ADD_NEW_DISEASE_FAILED](state, action) {
        return {
            ...state,
            errors:action
        };
    }
});

