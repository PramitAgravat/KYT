import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
    diseaseDoc:[]
};

export const diseaseDocReducer = createReducer(initialState, {

    [types.SET_USER_DISEASE_DOC](state, action) {
        return {
            ...state,
            diseaseDoc:action.data
        };
    },
});

