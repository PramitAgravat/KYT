import * as types from './types';

export function updateProfilePic(data) {
    return {
        type: types.UPDATE_PROFILE_PIC,
        data
    };
}

export function changeSendMeAlert(data) {
    return {
        type: types.CHANGE_SEND_ME_ALERT,
        data
    };
}

export function changeEmailEnable(data) {
    return {
        type: types.CHANGE_EMAIL_ENABLE,
        data
    };
}




export function updateProfile(response) {
    console.log("onUpdateProfileSuccess", response)
    return {
        type: types.UPDATE_PROFILE_RESPONSE,
        response
    };
}

export function updateProfileFailed(response) {
    return {
        type: types.UPDATE_PROFILE_FAILED,
        response
    };
}
