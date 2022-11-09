import React from 'react';
import { put, call, delay } from 'redux-saga/effects';

import { getNotificationList } from 'app/api/methods/notification';
import * as notificationActions from "app/actions/notificationActions";
import * as globalActions from "app/actions/globalActions";
import { Toast } from "native-base";

export const notificationSaga = function* notificationSaga(action) {
    try {
        console.log("SKK 1 :")
        yield put(globalActions.enableLoader());
        const response = yield call(getNotificationList);
        console.log("SKK 2 :" + JSON.stringify(response))
        yield put(globalActions.disableLoader());
        if (response.data.status) {
            console.log("SKK 3 :success")
            yield put(notificationActions.notificationSuccess(response.data.result));
            console.log("SKK 4 :success")
        } else
            yield put(notificationActions.notificationFailed(response.data.message));
    }
    catch (e) {
    }
}
