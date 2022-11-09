import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export const kycVerificationImage = function kycVerificationImage(data) {
    console.log('uploadImage data......', data);
    return Api(
        ApiConstants.ADD_USER_KYC_IMAGE,
        data,
        'post',
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );
}