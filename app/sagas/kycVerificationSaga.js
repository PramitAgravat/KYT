import React from 'react';
import { put, call } from 'redux-saga/effects';

import { kycVerificationImage } from 'app/api/methods/kycVerification';
import * as globalActions from "app/actions/globalActions";
import {navigateToHome} from 'app/navigation/NavigationHelpers';
import * as authActions from '../actions/authActions';
import {Toast} from "native-base";

export const kycVerificaitonSaga = function* kycVerificaitonSaga(action) {
    try{
    yield put(globalActions.enableLoader());
    const response = yield call(kycVerificationImage, action.data)
    yield put(globalActions.disableLoader());
    if (response.data.status) {
        yield put(authActions.updateProfile(response.data.result));
        yield call(navigateToHome);
    } else{
        Toast.show({
            text: response.data.errors,
            buttonText: "Okay",
            duration: 3000,
            type: "danger"
        });
        //yield put(kycVerificaitonAction.kycVerificationImage(response.data.message));
    }

}catch (e) {
        yield put(globalActions.disableLoader());
        Toast.show({
            text: 'Something wrong please try again.',
            buttonText: "Okay",
            duration: 3000,
            type: "danger"
        });
}

}
