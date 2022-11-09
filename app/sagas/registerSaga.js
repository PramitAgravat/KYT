import { put, call,delay } from 'redux-saga/effects';

import {registerUser,sendOtp} from 'app/api/methods/registerUser';
import * as registerActions from "app/actions/registerActions";
import {navigateToLogin} from "app/navigation/NavigationHelpers";
import * as globalActions from "app/actions/globalActions";



export const registerSaga = function* registerSagaAsync(action) {
   try{
    yield put(globalActions.enableLoader());
    const response = yield call(registerUser,action.data);
    //yield delay(3000);
    yield put(globalActions.disableLoader());
    if(response.data.status){
        //yield put(registerActions.onRegisterResponse(response.data));
        yield put(registerActions.openOtp(false));
        yield call(navigateToLogin);
    }else{
        yield put(registerActions.registerFailed(response.data.error));
    }
}
catch (e) {

}
    //yield put(registerActions.setProfileType(response.data));
}

export const sendOtpSaga = function* sendOtpSagaAsync(action) {
    try{
    yield put(globalActions.enableLoader());
    const response = yield call(sendOtp,action.data);
    //yield delay(2000);
    yield put(globalActions.disableLoader());
    if(response.data.status){
        yield put(registerActions.openOtp(true));
    }else{
        yield put(registerActions.registerFailed(response.data.message));
    }
}
catch (e) {

}
    //yield put(registerActions.setProfileType(response.data));
}
