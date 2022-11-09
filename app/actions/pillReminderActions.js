import * as types from './types';


export function setPillReminderList(response) {
    return {
        type: types.PILL_REMINDER_LIST,
        response
    };
}


export function requestAddPillReminder(response) {
    return {
        type: types.ADD_PILL_REMINDER_REQUEST,
        response
    };
}

export function requestPillReminder() {
    return {
        type: types.PILL_REMINDER_REQUEST
    };
}

export function requestMedicineList() {
    return {
        type: types.PILL_MEDICINE_LIST
    };
}


export function setMedicineType(response) {
    return {
        type: types.MEDICINE_TYPE,
        response
    };
}

export function getPillReminder(data) {
    console.log("Get Pill Reminder DATA--->", data)
    return {
        type: types.GET_PILL_REMINDER_REQUEST,
        data
    };
}

export function setPillReminder(response) {
    console.log("ACTION setPill Reminder Action", response);
    return {
        type: types.SET_PILL_REMINDER,
        response
    };
}

export function updatePillReminderFailed(response) {
    return {
        type: types.UPDATE_PILL_REMINDER_FAILED,
        response
    };
}

export function updatePillReminderResponse(response) {
    return {
        type: types.UPDATE_PILL_REMINDER_RESPONSE,
        response
    };
}

export function requestUpdatePillReminder(data) {
    return {
        type: types.UPDATE_PILL_REMINDER_REQUEST,
        data
    };
}