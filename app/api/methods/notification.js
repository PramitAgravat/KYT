import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export const getNotificationList = function getNotificationList() {
    return Api(
        ApiConstants.GET_NOTIFICATION,
        null,
        'get'
    );
}