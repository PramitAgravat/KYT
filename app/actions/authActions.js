import * as types from "./types";

export function onLoginSuccess(response) {
    return {
        type: types.AUTH_RESPONSE,
        response
    };
}

export function onAuthReset() {
    return {
        type: types.AUTH_RESET
    };
}

export function updateImage(response) {
    return {
        type: types.UPDATE_PROFILE_IMAGE,
        response
    };
}

export function updateSendMeAlert(data) {
    return {
        type: types.UPDATE_NOTIFICATION_ENABLE,
        data
    };
}

export function updateEmailEnable(data) {
    return {
        type: types.UPDATE_EMAIL_ENABLE,
        data
    };
}

export function updateProfile(response) {
    return {
        type: types.AUTH_RESPONSE,
        response
    };
}

export function unAuthenticated() {
    return {
        type:types.INVALID_TOKEN
    }
}

export function changeInsuranceClaim(data) {
    return {
        type: types.CHANGE_INSURANCE_CLAIM,
        data
    };
}

export function changeMedicalExpenses(data) {
    return {
        type: types.CHANGE_MEDICAL_EXPENSE,
        data
    };
}



export function changePrescription(data) {
    return {
        type: types.CHANGE_PRESCRIPTION,
        data
    };
}

export function changeTestResults(data) {
    return {
        type: types.CHANGE_TEST_RESULT,
        data
    };
}
export function changeRadioAndImaging(data) {
    return {
        type: types.CHANGE_RADIOLOGY_AND_IMAGING,
        data
    };
}

export function changeClinicalPhotograph(data) {
    return {
        type: types.CHANGE_CLINICAL_PHOTOGRAPH,
        data
    };
}

export function changeGeneticTests(data) {
    return {
        type: types.CHANGE_GENETIC_TESTS,
        data
    };
}

export function changeLaboratoryTests(data) {
    return {
        type: types.CHANGE_LABORATORY_TESTS,
        data
    };
}

export function changeHospitalDischargePapers(data) {
    return {
        type: types.CHANGE_HOSPITAL_DISCHARGE_PAPERS,
        data
    };
}
