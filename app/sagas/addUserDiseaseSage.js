import React from 'react';
import { put, call, delay } from 'redux-saga/effects';
import { addUserDisease } from 'app/api/methods/addUserDisease';
import * as addDiseaseActions from "app/actions/addDiseaseActions";
import * as globalActions from "app/actions/globalActions";
import { navigateToHealthRecord,navigateToLoginandReset } from "app/navigation/NavigationHelpers";
import * as healthRecordActions from 'app/actions/healthRecordActions';
import {Toast} from "native-base";
import * as authActions from 'app/actions/authActions';

export const addDiseaseSaga = function* addDiseaseSaga(action) {
        try{
            yield put(globalActions.enableLoader());
            const response = yield call(addUserDisease, action.data);
            yield put(globalActions.disableLoader());
            if (response.data.status) {
                yield put(healthRecordActions.setDiseaseList(response.data.result));
                yield call(navigateToHealthRecord);
            } else
                yield put(addDiseaseActions.addDiseaseFailed(response.data.errors));
        }
        catch (e) {

        }
}
