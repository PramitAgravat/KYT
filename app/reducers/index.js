/*
 * combines all th existing reducers
 */
import * as loadingReducer from './loadingReducer';
import * as loginReducer from './loginReducer';
import * as introReducer from './introReducer';
import * as globalReducer from './globalReducer';
import * as registerReducer from './registerReducer';
import * as authReducer from './authReducer';
import * as homeReducer from './homeReducer';
import * as healthRecordReducer from './healthRecordReducer';
import * as pillReminderReducer from './pillReminderReducer';
import * as doctorAppointmentReducer from './doctorAppointmentReducer';
import * as profileReducer from './profileReducer';
import * as addDiseaseReducer from './addDiseaseReducer';
import * as diseaseDocReducer from './diseaseDocReducer';
import * as walletReducer from './walletReducer';
import * as notificationReducer from './notificationReducer';

export default Object.assign(loginReducer, loadingReducer, introReducer, globalReducer, registerReducer, authReducer, homeReducer, healthRecordReducer, pillReminderReducer, doctorAppointmentReducer, profileReducer, addDiseaseReducer, diseaseDocReducer, walletReducer, notificationReducer);
