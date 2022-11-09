import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export const getUserDiseaseDoc = function getUserDiseaseDoc(data) {
    return Api(
        ApiConstants.SHOW_DISEASE_DOC,
        data,
        'post'
    );
}

