import React from 'react';
import { put, call, delay } from 'redux-saga/effects';

import { getWalletTransactionList, requestWallet, requestPageContent } from 'app/api/methods/wallet';
import * as walletActions from "app/actions/walletActions";
import { Toast } from "native-base";
import * as globalActions from '../actions/globalActions';
export const walletTransactionListFetch = function* walletTransactionListFetch(action) {
    try {
        const response = yield call(getWalletTransactionList, action.data);
        console.log("Wallet SAGA 1-->", response.data.result)
        console.log("Wallet SAGA 2-->", response.data.wallet_point)

        yield put(walletActions.setWalletTransactionList(response.data.result));
        yield put(walletActions.setWalletBalance(response.data.wallet_point));
    } catch (e) {

    }
}

export const requestWalletFetch = function* requestWalletFetch(action) {
    try {
        yield put(globalActions.enableLoader());
        const response = yield call(requestWallet, action.response);
        console.log("Wallet SAGA 1-->", response.data.result)
        // console.log("Wallet SAGA 2-->", response.data.wallet_point)
        yield put(globalActions.disableLoader());
        if (response.data.status) {
            yield put(walletActions.setReedemPoint(true));
        }
        else {
            Toast.show({
                text: response.data.errors,
                buttonText: "Okay",
                duration: 3000,
                type: "danger"
            });
            //yield put(kycVerificaitonAction.kycVerificationImage(response.data.message));
        }
    } catch (e) {
        yield put(globalActions.disableLoader());
    }
}

export const requestPageContentFetch = function* requestPageContentFetch(action) {
    try {
        yield put(globalActions.enableLoader());
        const response = yield call(requestPageContent, action.response);
        console.log("Wallet PAGE CONTENT-->", response.data.result);
        yield put(globalActions.disableLoader());
        yield put(walletActions.setPageContent(response.data.result));
    } catch (e) {
        yield put(globalActions.disableLoader());
    }
}
