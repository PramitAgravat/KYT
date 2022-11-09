import React from 'react';
import { put, call,delay } from 'redux-saga/effects';

import {updateProfilePic,updateProfile,changeEmailEnable,changeSendMeAlert} from 'app/api/methods/updateProfile';
import * as globalActions from "app/actions/globalActions";
import * as authActions from "app/actions/authActions";
import * as profileActions from "../actions/profileActions";
import {navigateToLoginandReset, navigateToProfile} from '../navigation/NavigationHelpers';
import {Toast} from "native-base";


export const updateProfilePicFetch = function* updateProfilePicFetch(action) {
try{
    console.log(action);
    yield put(globalActions.enableLoader());
    const response = yield call(updateProfilePic,action.data);
    console.log(response);
    yield put(globalActions.disableLoader());
    if(response.data.status){
        yield put(authActions.updateImage(response.data.result));
    }else{
        yield put(profileActions.updateProfileFailed(response.data.errors));
    }

}
catch (e) {

}
}

export const changeNotificationFetch = function* changeNotificationFetch(action) {
try{
    console.log(action);
    yield put(globalActions.enableLoader());
    const response = yield call(changeSendMeAlert,action.data);
    console.log(response);
    yield put(globalActions.disableLoader());
    if(response.data.status){
        yield put(authActions.updateSendMeAlert(response.data.result));
    }else{
        yield put(profileActions.updateProfileFailed(response.data.errors));
    }

}
catch (e) {

}
}

export const changeEmailEnableFetch = function* changeEmailEnableFetch(action) {
try{
    console.log(action);
    yield put(globalActions.enableLoader());
    const response = yield call(changeEmailEnable,action.data);
    console.log(response);
    yield put(globalActions.disableLoader());
    if(response.data.status){
        yield put(authActions.updateEmailEnable(response.data.result));
    }else{
        yield put(profileActions.updateProfileFailed(response.data.errors));
    }
}
catch (e) {

}
}

export const updateProfileFetch = function* updateProfileFetch(action) {

    console.log(action);
    try {
        yield put(globalActions.enableLoader());
        const response = yield call(updateProfile,action.response);
        console.log('response',response);
        yield put(globalActions.disableLoader());
        if(response.data.status){
            yield put(authActions.updateProfile(response.data.result));
            yield call(navigateToProfile);
        }else{
            yield put(profileActions.updateProfileFailed(response.data.errors));
        }
    }catch (e) {

    }


}

