import Api from 'app/api';
import ApiConstants from '../ApiConstants';
import { store } from "app/store/configureStore";
export const getVideoList = function getVideoList(data) {
    return Api(
        ApiConstants.VIDEO_LIST,
        data,
        'post'
    );
}

export const getBlogList = function getBlogList(data) {
    return Api(
        ApiConstants.BLOG_LIST,
        data,
        'post'
    );
}

export const addFeeling = function addFeeling(data) {
    return Api(
        ApiConstants.ADD_FEELING_TODAY,
        data,
        'post',
        store.getState().authReducer.token
    );
}
