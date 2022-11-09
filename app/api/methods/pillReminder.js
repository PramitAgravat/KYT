import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export const getPillReminderList = function getPillReminderList() {
    return Api(
        ApiConstants.PILL_REMINDER_LIST,
        null,
        'get'
    );
}


export const getMedicineList = function getMedicineList() {
    return Api(
        ApiConstants.MEDICINE_TYPE,
        null,
        'get'
    );
}

export const addPillReminder = function addPillReminder(data) {
    return Api(
        ApiConstants.ADD_PILL_REMINDER,
        data,
        'post'
    );
}


export const getPillReminder = function getPillReminder(data) {
    console.log("Get Pill Reminder API CALL", data)
    return Api(
        ApiConstants.GET_PILL_REMINDER,
        data,
        'post'
    );
}

export const updatePillReminder = function updatePillReminder(data) {
    console.log("UPDATE Pill Reminder API CALL", data)
    return Api(
        ApiConstants.UPDATE_PILL_REMINDER,
        data,
        'post'
    );
}