import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
    errors:[]
};

export const profileReducer = createReducer(initialState, {


    [types.UPDATE_PROFILE_FAILED](state,action) {
        return {
            ...state,
            errors:action.response
        };
    }
});
