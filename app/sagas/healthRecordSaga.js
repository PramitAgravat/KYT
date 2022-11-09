import React from 'react';
import { put, call } from 'redux-saga/effects';

import {getDiseaseList} from 'app/api/methods/healthRecord';
import * as healthRecordActions from "app/actions/healthRecordActions";
import * as authActions from '../actions/authActions';
import {navigateToLoginandReset} from '../navigation/NavigationHelpers';
import {Toast} from "native-base";


export const diseaseListFetch = function* diseaseListFetch(action) {
try{
    console.log(action);
    const response = yield call(getDiseaseList);
    console.log(response);
    yield put(healthRecordActions.setDiseaseList(response.data.result));
}
catch (e) {

}

}

