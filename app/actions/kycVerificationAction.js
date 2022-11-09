import * as types from './types';

export function kycVerificationImage(data) {
    return {
        type: types.ADD_KYC_VERIFICTION,
        data
    };
}
