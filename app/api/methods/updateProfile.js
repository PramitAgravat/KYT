import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export const updateProfile = function updateProfile(data) {
    console.log('data......',data);
    return Api(
        ApiConstants.UPDATE_PROFILE,
        data,
        'post',
        { headers: {'Content-Type': 'multipart/form-data'} }
    );
}

export const updateProfilePic = function updateProfilePic(data) {
    return Api(
        ApiConstants.UPDATE_PROFILE_IMAGE,
        data,
        'post',
        { headers: {'Content-Type': 'multipart/form-data'} }
    );
}


export const changeSendMeAlert = function changeSendMeAlert(data) {
    return Api(
        ApiConstants.IS_SEND_ME_ALERT,
        data,
        'post'
    );
}


export const changeEmailEnable = function changeEmailEnable(data) {
    return Api(
        ApiConstants.IS_EMAIL_ENABLE,
        data,
        'post'
    );
}
