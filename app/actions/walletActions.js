import * as types from './types';

export function checkNewUser() {
    return {
        type: types.IS_NEW_USER
    };
}

export function getWalletTransactionData(data) {
    console.log("Wallet Actions", data)
    return {
        type: types.WALLET_TRANSACTION_HISTORY_REQUEST,
        data
    };
}
export function setWalletTransactionList(response) {
    return {
        type: types.SET_WALLET_TRANSACTION_HISTORY,
        response
    };
}
export function setWalletBalance(response) {
    return {
        type: types.SET_WALLET_BALANCE,
        response
    };
}
export function getPageContent(){
    return{
        type: types.REQUEST_CONTENT
    }
}
export function setPageContent(response){
    return {
        type: types.SET_CONTENT,
        response
    };
}

export function requestRedeemPoint(response) {
    return {
        type: types.REQUEST_WALLET,
        response
    };
}

export function setReedemPoint(response) {
    return {
        type: types.SET_REEDEM_POINT,
        response
    };
}
