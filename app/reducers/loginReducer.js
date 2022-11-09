/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
    errors: [],
    loginData: [],
};

export const loginReducer = createReducer(initialState, {
    [types.LOGIN_REQUEST](state, action) {
        return {
            ...state,
            loginData: action.response
        };
    },
    [types.LOGIN_FAILED](state, action) {
        return {
            ...state,
            errors: action
        };
    },
    [types.LOGIN_RESET](state) {
        return {
            ...state,
            errors: []
        }
    },
    [types.LOGIN_SUCCESS](state, action) {
        return {
            ...state,
            loginSuccess: action.response ? action.response : {}
        };
    },
});

