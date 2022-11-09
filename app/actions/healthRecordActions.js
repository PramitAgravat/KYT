import * as types from './types';


export function setDiseaseList(response) {
    return {
        type: types.SET_DISEASE_LIST,
        response
    };
}


export function requestDisease() {
    return {
        type: types.DISEASE_REQUEST
    };
}


