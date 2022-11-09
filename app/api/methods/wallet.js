import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export const getWalletTransactionList = function getWalletTransactionList(data) {
    console.log("Wallet Methods")
    return Api(
        ApiConstants.WALLET_TRANSACTION_HISTORY,
        data,
        'post'
    );
}

export const requestWallet = function requestWallet(data) {
    console.log("Request Wallet")
    return Api(
        ApiConstants.REQUEST_WALLET,
        data,
        'post'
    );
}

export const requestPageContent = function requestPageContent(data) {
    console.log("Request Page Content",data);
    return Api(
        ApiConstants.PAGE_CONTENT,
        null,
        'get'
    );
};
