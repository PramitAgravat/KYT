import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
    pillReminderList: [],
    medicineType:[],
    pillReminderList:[]

};

export const pillReminderReducer = createReducer(initialState, {

    [types.SET_PILL_REMINDER](state, action) {
        return {
            ...state,
            pillReminder: action.response ? action.response : []
        };
    },
    [types.UPDATE_PILL_REMINDER_REQUEST](state, action) {
        return {
            ...state,
            updatePillReminderResponse: action.response
        };
    },
    [types.UPDATE_PILL_REMINDER_FAILED](state, action) {
        return {
            ...state,
            errors: action
        };
    },
    [types.UPDATE_PILL_REMINDER_RESPONSE](state) {
        return {
            ...state,
        }
    },


    [types.PILL_REMINDER_LIST](state, action) {
        return {
            ...state,
            pillReminderList: action.response ? action.response : []
        };
    },
    [types.MEDICINE_TYPE](state, action) {
        return {
            ...state,
            medicineType: action.response ? action.response : []
        };
    }
});
