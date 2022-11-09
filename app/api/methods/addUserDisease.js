import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export const addUserDisease = function addUserDisease(data) {
    return Api(
        ApiConstants.ADD_USER_DISEASE,
        data,
        'post'
    );
}
