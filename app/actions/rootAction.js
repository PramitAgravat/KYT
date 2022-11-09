import * as types from './types';

export function startup(status,isNewUser) { //actionCreator function
    return {
        type: types.START_APP, //action object
        status,
        isNewUser
    };
}
