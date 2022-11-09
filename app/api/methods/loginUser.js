import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export const loginUser = function loginUser(param) {
    return Api(
        ApiConstants.LOGIN ,
        param,
        'post'
    );
}

