import * as types from './types';

export function checkNewUser() {
    return {
        type: types.IS_NEW_USER
    };
}

export function openHealthScreen() {
 return {
     type:types.IS_HEALTH_SCREEN_OPEN
 }
}

export function openHealthDocScreen() {
    return {
        type:types.IS_HEALTH_DOC_SCREEN_OPEN
    }
}

export function showMedicalRecordModal() {
    return {
        type:types.SHOW_MEDICAL_RECORD
    }
}

export function homePageTour() {
    return {
        type:types.IS_HOME_PAGE_TOUR_DONE
    }
}
