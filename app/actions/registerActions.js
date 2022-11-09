import * as types from './types';


export function getProfileType() {
    return {
        type: types.PROFILE_TYPES
    };
}

export function setProfileType(data) {
    return {
        type: types.SET_PROFILE_TYPES,
        data:data
    };
}

export function requestRegister(data) {
    return {
        type: types.REGISTER_REQUEST,
        data
    };
}

export function requestOtp(data) {
    return {
        type: types.SEND_OTP_REQUEST,
        data
    };
}

export function openOtp(data) {
    return {
        type: types.OPEN_OTP_MODAL,
        data
    };
}
export function registerFailed(response) {
    return {
        type: types.REGISTER_FAILED,
        response
    };
}

export function onRegisterResponse(response) {
    return {
        type: types.REGISTER_RESPONSE,
        response
    };
}
