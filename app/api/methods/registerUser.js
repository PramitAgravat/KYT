import Api from 'app/api';
import ApiConstants from '../ApiConstants';

/*export const getProfileTpye = function getProfileType() {
    return Api(
        ApiConstants.GET_PROFILE_TYPE,
        null,
        'get'
    );
}*/

export const registerUser = function registerUser(data) {
    return Api(
        ApiConstants.REGISTER,
        data,
        'post'
    );
}

export const sendOtp = function sendOtp(data) {
    return Api(
        ApiConstants.SEND_OTP,
        data,
        'post'
    );
}
