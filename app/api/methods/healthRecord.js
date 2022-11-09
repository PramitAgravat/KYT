import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export const getDiseaseList = function getDiseaseList() {
    return Api(
        ApiConstants.GET_DISEASE_TYPE,
        null,
        'post'
    );
}

