import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
    isNewUser: true,
    isHealthScreenOpen:false,
    isHealthDocScreenOpen:true,
    showMedicalRecordModal:true,
    isHomePageTourDone:false
};

export const introReducer = createReducer(initialState, {
    [types.IS_NEW_USER](state, action) {
        return {
            ...state,
            isNewUser: false
        };
    },
    [types.IS_HEALTH_SCREEN_OPEN](state) {
        return {
            ...state,
            isHealthScreenOpen: true
        };
    },
    [types.IS_HEALTH_DOC_SCREEN_OPEN](state){
        return {
            ...state,
            isHealthDocScreenOpen: false
        };
    },
    [types.SHOW_MEDICAL_RECORD](state){
        return {
            ...state,
            showMedicalRecordModal: false
        };
    },
    [types.IS_HOME_PAGE_TOUR_DONE](state){
        return {
            ...state,
            isHomePageTourDone: true
        };
    }
});
