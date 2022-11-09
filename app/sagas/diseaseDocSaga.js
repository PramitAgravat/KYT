import React from 'react';
import { put, call } from 'redux-saga/effects';
import { getUserDiseaseDoc } from 'app/api/methods/userDiseaseDoc';
import * as diseaseDocActions from "app/actions/diseaseDocActions";
import * as globalActions from '../actions/globalActions';
import * as authActions from '../actions/authActions';
import {navigateToLoginandReset} from '../navigation/NavigationHelpers';
import {Toast} from "native-base";

export const listUserDiseaseDocFetch = function* listUserDiseaseDocFetch(action) {
try{
    yield put(globalActions.enableLoader());
    const response = yield call(getUserDiseaseDoc,action.data);
    if(response.data.status){
        console.log('response.data.result',response.data.result);
        yield put(diseaseDocActions.setUserDiseaseDoc(response.data.result));
    }
    yield put(globalActions.disableLoader());
}
catch (e) {

}

}




