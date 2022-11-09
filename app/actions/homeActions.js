import * as types from './types';

export function getVideoData(data) {
    console.log("Home Actions", data)
    return {
        type: types.VIDEO_REQUEST,
        data
    };
}

export function getBlogList(data) {
    return {
        type: types.BLOG_REQUEST,
        data
    };
}

export function setVideoList(response) {
    return {
        type: types.SET_VIDEO_LIST,
        response
    };
}

export function setBlogList(response) {
    return {
        type: types.SET_BLOG_LIST,
        response
    };
}

export function addFeelingFailed(response) {
    return {
        type: types.ADD_FEELING_FAILED,
        response
    };
}

export function addFeelingSuccess(response) {
    return {
        type: types.ADD_FEELING_SUCCESS,
        response
    };
}

export function addFeelingResponse(response) {
    return {
        type: types.ADD_FEELING_RESPONSE,
        response
    };
}

export function getUserLoginStatus() {
    return {
        type:types.GET_USER_LOGIN_STATUS
    }
}

export function requestAddFeeling(data) {
    return {
        type: types.ADD_FEELING_REQUEST,
        data
    };
}
