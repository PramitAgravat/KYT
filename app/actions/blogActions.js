import * as types from './types';

export function getBlogDetail(data) {
    return {
        type: types.BLOG_DETAIL_REQUEST,
        data
    };
}

export function setBlogDetail(response) {
    return {
        type: types.SET_BLOG_DETAIL,
        response
    };
}
