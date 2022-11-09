import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
    diseaseList:[],

};

export const healthRecordReducer = createReducer(initialState, {

    [types.DISEASE_REQUEST](state, action) {
        return {
            ...state,
            response: action.response
        };
    },
    [types.SET_DISEASE_LIST](state, action) {
        return {
            ...state,
            diseaseList: action.response ? action.response : []
        };
    }
});
