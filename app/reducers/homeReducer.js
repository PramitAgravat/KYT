import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
    videoList: [],
    blogList: [],
    errors: [],
    addFeelingResponse: [],
    addFeelingSuccess: {}
};

export const homeReducer = createReducer(initialState, {

    [types.SET_VIDEO_LIST](state, action) {
        return {
            ...state,
            videoList: action.response ? action.response : []
        };
    },
    [types.SET_BLOG_LIST](state, action) {
        return {
            ...state,
            blogList: action.response ? action.response : []
        };
    },
    [types.ADD_FEELING_REQUEST](state, action) {
        return {
            ...state,
            addFeelingResponse: action.response
        };
    },
    [types.ADD_FEELING_FAILED](state, action) {
        return {
            ...state,
            errors: action
        };
    },
    [types.ADD_FEELING_SUCCESS](state, action) {
        return {
            ...state,
            addFeelingSuccess: action.response ? action.response : {}
        };
    },
    [types.ADD_FEELING_RESPONSE](state) {
        return {
            ...state,
        }
    }
});

