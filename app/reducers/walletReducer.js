import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
    walletTransactionList: [],
    walletBalance: [],
    reedemPointData: false,
    pageContent:'',
};

export const walletReducer = createReducer(initialState, {

    [types.SET_WALLET_TRANSACTION_HISTORY](state, action) {
        return {
            ...state,
            walletTransactionList: action.response ? action.response : []
        };
    },

    [types.SET_WALLET_BALANCE](state, action) {
        return {
            ...state,
            walletBalance: action.response ? action.response : []
        };
    },
    [types.REQUEST_WALLET](state, action) {
        return {
            ...state,
            response: action.response
        };
    },

    [types.SET_REEDEM_POINT](state, action) {
        return {
            ...state,
            reedemPointData: action.response
        };
    },

    [types.SET_CONTENT](state, action) {
        return {
            ...state,
            pageContent: action.response ? action.response : ''
        };
    },

    [types.REQUEST_CONTENT](state, action) {
        return {
            ...state,
            response: action.response
        };
    },
});

