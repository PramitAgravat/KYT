/*
 * Reducer actions related with login
 */
import * as types from './types';

export function notificationFailed(response) {
    return {
        type: types.NOTIFICATION_FAILED,
        response
    };
}

export function notificationSuccess(response) {
    return {
        type: types.NOTIFICATION_SUCCESS,
        response
    };
}

export function notificationResponse(response) {
    return {
        type: types.NOTIFICATION_RESPONSE,
        response
    };
}


export function requestNotification() {
    return {
        type: types.NOTIFICATION_REQUEST
    };
}
