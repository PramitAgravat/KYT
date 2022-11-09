import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export const checkAuth = function checkAuth() {
    return Api(
        ApiConstants.AUTH_FETCH,
        null,
        'get',
        null
    );
}

