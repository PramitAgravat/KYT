import * as types from "./types";

export function listUserDiseaseDoc(data) {
    return {
        type: types.LIST_USER_DISEASE_DOC,
        data:data
    };
}

export function setUserDiseaseDoc(data) {
    return {
        type: types.SET_USER_DISEASE_DOC,
        data:data
    };
}
