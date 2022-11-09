// export action creators
import * as loginActions from './loginActions';
import * as introActions from './introActions';
import * as navigationActions from './navigationActions';
import * as rootActions from './rootAction';
import * as registerActions from './registerActions';
import * as globalActions from './globalActions';
import * as authActions from './authActions';
import * as homeActions from './homeActions';
import * as healthRecordActions from './healthRecordActions';
import * as pillReminderActions from './pillReminderActions';
import * as doctorAppointmentActions from './doctorAppointmentActions';
import * as addDiseaseActions from './addDiseaseActions';
import * as diseaseActions from './diseaseActions';
import * as walletActions from './walletActions';
export const ActionCreators = Object.assign(
    {},
    loginActions,
    navigationActions,
    introActions,
    rootActions,
    registerActions,
    globalActions,
    authActions,
    homeActions,
    healthRecordActions,
    pillReminderActions,
    doctorAppointmentActions,
    addDiseaseActions,
    walletActions
);
