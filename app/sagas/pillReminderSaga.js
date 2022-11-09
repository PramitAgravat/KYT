import React from 'react';
import { put, call, delay } from 'redux-saga/effects';

import { getPillReminderList, getMedicineList, addPillReminder, updatePillReminder, getPillReminder } from 'app/api/methods/pillReminder';
import * as pillReminderActions from "app/actions/pillReminderActions";
import * as globalActions from "../actions/globalActions";
import { navigateToPillReminder, navigateToRxTimeline } from 'app/navigation/NavigationHelpers';
/*import Toast from 'react-native-simple-toast';
import ToastMessages from 'app/config/ToastMessages';*/
export const pillReminderListFetch = function* pillReminderListFetch(action) {
    try {
        const response = yield call(getPillReminderList);
        yield put(pillReminderActions.setPillReminderList(response.data.result));
    } catch (e) {

    }
}


export const pillMedicineFetch = function* pillMedicineFetch() {
    try {
        const response = yield call(getMedicineList);
        yield put(pillReminderActions.setMedicineType(response.data.result));
    }
    catch (e) {

    }

}

export const addPillReminderFetch = function* addPillReminderFetch(action) {
    try {
        yield put(globalActions.enableLoader());


        const response = yield call(addPillReminder, action.response);
        yield put(globalActions.disableLoader());
        if (response.data.status) {
            //Toast.showWithGravity(response.data.msg, Toast.SHORT, Toast.CENTER)
            yield call(navigateToPillReminder)
        } else {
            // yield put(pillReminderActions.registerFailed(response.data.message));
        }
    }
    catch (e) {

    }

}

export const getPillRedminerFetch = function* getPillRedminerFetch(action) {
    console.log("Get Pill Reminder Fetch", action)
    try {
        const response = yield call(getPillReminder, action.data);
        console.log("Get setPillRedminer Response", response.data.result);
        yield put(pillReminderActions.setPillReminder(response.data.result));
    }
    catch (e) {

    }

}


export const updatePillReminderSaga = function* updatePillReminderSaga(action) {
    try {
        console.log(" updatePillReminderSaga 1", action);
        console.log(" updatePillReminderSaga 2", action.data);
        yield put(globalActions.enableLoader());
        const response = yield call(updatePillReminder, action.data);
        yield put(globalActions.disableLoader());
        if (response.data.status) {
            //yield put(registerActions.onRegisterResponse(response.data));
            // alert("UPDATE PillREminder")
            yield call(navigateToRxTimeline);
        } else
            yield put(pillReminderActions.updatePillReminderFailed(response.data.message));
    }
    catch (e) {

    }


}



