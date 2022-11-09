import * as types from './types';

export function addDiseaseFailed(response) {
    return {
        type: types.ADD_NEW_DISEASE_FAILED,
        response
    };
}

export function addDiseaseResponse(response) {
    return {
        type: types.ADD_NEW_DISEASE_RESPONSE,
        response
    };
}


export function requestAddDisease(data) {
    return {
        type: types.ADD_NEW_DISEASE_REQUEST,
        data
    };
}