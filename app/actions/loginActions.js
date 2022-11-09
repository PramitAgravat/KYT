/*
 * Reducer actions related with login
 */
import * as types from './types';

export function requestLogin(data) {
    return {
        type: types.LOGIN_REQUEST,
        data
    };
}

export function loginFailed(response) {
    return {
        type: types.LOGIN_FAILED,
        response
    };
}


export function onLoginReset() {
    return {
        type:types.LOGIN_RESET
    }
}

export function onLoginResponse(response) {
    return {
        type: types.LOGIN_RESPONSE,
        response
    };
}

export function loginSuccess(response) {
    return {
        type: types.LOGIN_SUCCESS,
        response
    };
}
