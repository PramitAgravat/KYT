/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
    errors: [],
    notificationDataList: []
};

export const notificationReducer = createReducer(initialState, {
    [types.NOTIFICATION_REQUEST](state, action) {
        return {
            ...state,
            response: action.response
        };
    },
    [types.NOTIFICATION_FAILED](state, action) {
        return {
            ...state,
            errors: action
        };
    },
    [types.NOTIFICATION_SUCCESS](state, action) {
        return {
            ...state,
            notificationDataList: action.response ? action.response : []
        };
    }
});

