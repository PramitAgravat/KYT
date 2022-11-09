import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
    mainUser: {
        name: null,
        email: null,
        phone: null,
        dob: null,
        gender: null,
        image_url: null,
        firebase_token: null,
        health_insurance_no: null,
        aadhar_image_url: null,
        pan_image_url: null,
        policy_no: null,
        emergency_number: null,
        is_notification_enable: 1,
        is_data_share: null,
        is_email_enable: 1,
        is_kyc_verified: 0,
        wallet_balance: 0,
        address: null,
        pincode: null,
        created_at: null,
        updated_at: null,
        deleted_at: null,
        insurance_claims_data: 1,
        medical_expenses: 1,
        doctors_report: 1,
        prescription: 1,
        test_results: 1,
        unique_code: null,
        is_first_time_login:0,
        pan_verified:0,
        laboratory_tests: 1,
        clinical_photograph: 1,
        radiology_and_imaging:1,
        hospital_discharge_papers:1,
        genetic_tests:1,
        aadhar_verified:0,
        health_image_verified:0
    },
    isAuth: false,
    token: null
};

export const authReducer = createReducer(initialState, {

    [types.AUTH_RESPONSE](state, action) {
        console.log('action.response', action);
        return {
            ...state,
            mainUser: {
                id: action.response.id,
                name: action.response.name,
                email: action.response.email,
                phone: action.response.phone,
                dob: action.response.dob,
                gender: action.response.gender,
                image_url: action.response.image_url,
                firebase_token: action.response.firebase_token,
                /*health_insurance_no: action.response.health_insurance_no,
                policy_no: action.response.policy_no,*/

                health_insurance_url: action.response.health_insurance_url,

                aadhar_image_url: action.response.aadhar_image_url,
                pan_image_url: action.response.pan_image_url,
                emergency_number: action.response.emergency_number,
                is_notification_enable: action.response.is_notification_enable,
                is_data_share: action.response.is_data_share,
                is_email_enable: action.response.is_email_enable,
                is_kyc_verified: action.response.is_kyc_verified,
                wallet_points: action.response.wallet_points,
                address: action.response.address,
                pincode: action.response.pincode,
                created_at: action.response.created_at,
                updated_at: action.response.updated_at,
                deleted_at: action.response.deleted_at,
                insurance_claims_data: action.response.insurance_claims_data,
                medical_expenses: action.response.medical_expenses,
                laboratory_tests: action.response.laboratory_tests,
                clinical_photograph: action.response.clinical_photograph,
                prescription: action.response.prescription,
                test_results: action.response.test_results,
                unique_code: action.response.unique_code,
                is_first_time_login:action.response.is_first_time_login,
                pan_verified:action.response.pan_verified,
                radiology_and_imaging:action.response.radiology_and_imaging,
                hospital_discharge_papers:action.response.hospital_discharge_papers,
                genetic_tests:action.response.genetic_tests,
                aadhar_verified:action.response.aadhar_verified,
                health_image_verified:action.response.health_image_verified
            },
            isAuth: true,
            token: action.response.api_token
        };
    },
    [types.AUTH_RESET](state) {
        return initialState
    },

    [types.UPDATE_PROFILE_RESPONSE](state, action) {
        console.log('UPDATE_PROFILE_RESPONSE', action);
        return {
            ...state,
        }
    },
    [types.UPDATE_PROFILE_IMAGE](state, action) {
        console.log('UPDATE_PROFILE_RESPONSE', action);
        return {
            ...state,
            mainUser: {
                ...state.mainUser,
                image_url: action.response
            }
        }
    },
    [types.UPDATE_NOTIFICATION_ENABLE](state, action) {
        console.log('UPDATE_PROFILE_RESPONSE', action);
        return {
            ...state,
            mainUser: {
                ...state.mainUser,
                is_notification_enable: action.data
            }
        }
    },
    [types.CHANGE_INSURANCE_CLAIM](state, action) {
        console.log('UPDATE_PROFILE_RESPONSE', action);
        return {
            ...state,
            mainUser: {
                ...state.mainUser,
                insurance_claims_data: action.data
            }
        }
    },
    [types.CHANGE_MEDICAL_EXPENSE](state, action) {
        console.log('UPDATE_PROFILE_RESPONSE', action);
        return {
            ...state,
            mainUser: {
                ...state.mainUser,
                medical_expenses: action.data
            }
        }
    },
    [types.CHANGE_PRESCRIPTION](state, action) {
        console.log('UPDATE_PROFILE_RESPONSE', action);
        return {
            ...state,
            mainUser: {
                ...state.mainUser,
                prescription: action.data
            }
        }
    },
    [types.CHANGE_RADIOLOGY_AND_IMAGING](state, action) {
        console.log('UPDATE_PROFILE_RESPONSE', action);
        return {
            ...state,
            mainUser: {
                ...state.mainUser,
                radiology_and_imaging: action.data
            }
        }
    },
    [types.CHANGE_CLINICAL_PHOTOGRAPH](state, action) {
        console.log('UPDATE_PROFILE_RESPONSE', action);
        return {
            ...state,
            mainUser: {
                ...state.mainUser,
                clinical_photograph: action.data
            }
        }
    },
    [types.CHANGE_GENETIC_TESTS](state, action) {
        console.log('UPDATE_PROFILE_RESPONSE', action);
        return {
            ...state,
            mainUser: {
                ...state.mainUser,
                genetic_tests: action.data
            }
        }
    },
    [types.CHANGE_TEST_RESULT](state, action) {
        console.log('UPDATE_PROFILE_RESPONSE', action);
        return {
            ...state,
            mainUser: {
                ...state.mainUser,
                test_results: action.data
            }
        }
    },
    [types.CHANGE_LABORATORY_TESTS](state, action) {
        console.log('UPDATE_PROFILE_RESPONSE', action);
        return {
            ...state,
            mainUser: {
                ...state.mainUser,
                laboratory_tests: action.data
            }
        }
    },
    [types.CHANGE_HOSPITAL_DISCHARGE_PAPERS](state, action) {
        return {
            ...state,
            mainUser: {
                ...state.mainUser,
                hospital_discharge_papers: action.data
            }
        }
    }
});

