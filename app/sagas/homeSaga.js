import React from 'react';
import { put, call, delay } from 'redux-saga/effects';

import { getBlogList, getVideoList, addFeeling,getUserLoginStatus } from 'app/api/methods/home';
import * as homeActions from "app/actions/homeActions";
import * as globalActions from "app/actions/globalActions";
import * as authActions from 'app/actions/authActions';
export const videoListFetch = function* videoListFetch(action) {
    console.log("HOME SAGA", action)
    try {
        const response = yield call(getVideoList, action.data);
        yield put(homeActions.setVideoList(response.data.result));
    }
    catch (e) {

    }

}

export const blogListFetch = function* blogListFetch(action) {
    try {
        const response = yield call(getBlogList, action.data);
        yield put(homeActions.setBlogList(response.data.result));

    }
    catch (e) {

    }
}


export const addFeelingSaga = function* addFeelingSaga(action) {
    try {
        yield put(globalActions.enableLoader());
        const response = yield call(addFeeling, action.data);
        yield put(globalActions.disableLoader());
        if (response.data.status) {
            yield put(homeActions.addFeelingSuccess(response));
            // yield call(navigateToHomeandReset);
        } else
            yield put(homeActions.addFeelingFailed(response.data.message));
    }
    catch (e) {

    }


}

