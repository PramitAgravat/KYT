import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
    profileTypes: [],
    errors:[],
    open_otp:false
};

export const registerReducer = createReducer(initialState, {

    [types.PROFILE_TYPES](state, action) {
        return {
            ...state
        };
    },
    [types.REGISTER_LOADING_ENDED](state) {
        return { ...state };
    },
    [types.SET_PROFILE_TYPES](state, action) {
        return {
            ...state,
            profileTypes: action.data ? action.data :[]
        };
    },
    [types.REGISTER_REQUEST](state, action) {
        return {
            ...state,
            response: action.response
        };
    },
    [types.SEND_OTP_REQUEST](state, action) {
        return {
            ...state,
            response: action.response
        };
    },
    [types.OPEN_OTP_MODAL](state, action){
        return {
            ...state,
            open_otp: action.data
        };
    },
    [types.REGISTER_RESPONSE](state, action) {
        return {
            ...state
        };
    },
    [types.REGISTER_FAILED](state,action) {
        return {
            ...state,
            errors:action
        };
    }
});
