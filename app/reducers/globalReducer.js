import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
    is_visible:false
};

export const globalReducer = createReducer(initialState, {

    [types.ENABLE_LOADER](state) {
        return {
            ...state,
            is_visible: true
        };
    },
    [types.DISABLE_LOADER](state) {
        return {
            ...state,
            is_visible: false
        };
    }
});