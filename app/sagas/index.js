/**
 *  Redux saga class init
 */
import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import loginSaga from './loginSaga';
import introSaga from './introSaga';
import rootSaga from './rootSaga';
import { registerSaga, sendOtpSaga } from './registerSaga';

import { videoListFetch, blogListFetch, addFeelingSaga } from './homeSaga';
import { diseaseListFetch } from './healthRecordSaga';
import { pillReminderListFetch, pillMedicineFetch, addPillReminderFetch, getPillRedminerFetch, updatePillReminderSaga } from './pillReminderSaga';
import { diseasesListFetch, addDoctorAppointmentSaga, getdoctorAppointment, updateDoctorAppointmentSaga } from './doctorAppointmentSaga';
import { updateProfilePicFetch, updateProfileFetch, changeNotificationFetch, changeEmailEnableFetch } from './profileSaga';
import { addDiseaseSaga } from './addUserDiseaseSage';
import { kycVerificaitonSaga } from './kycVerificationSaga';
import { listUserDiseaseDocFetch } from './diseaseDocSaga';
import { walletTransactionListFetch, requestWalletFetch, requestPageContentFetch } from './walletSaga';
import { notificationSaga } from './notificationSaga';
export default function* watch() {
    yield all([
        takeLatest(types.START_APP, rootSaga),
        takeLatest(types.LOGIN_REQUEST, loginSaga),
        // takeLatest(types.UPDATE_PROFILE_RESPONSE, updateProfile),
        takeLatest(types.IS_NEW_USER, introSaga),
        takeLatest(types.REGISTER_REQUEST, registerSaga),
        takeLatest(types.SEND_OTP_REQUEST, sendOtpSaga),
        takeLatest(types.VIDEO_REQUEST, videoListFetch),
        takeLatest(types.BLOG_REQUEST, blogListFetch),
        takeLatest(types.DISEASE_REQUEST, diseaseListFetch),
        takeLatest(types.PILL_REMINDER_REQUEST, pillReminderListFetch),
        takeLatest(types.GET_PILL_REMINDER_REQUEST, getPillRedminerFetch),
        takeLatest(types.UPDATE_PILL_REMINDER_REQUEST, updatePillReminderSaga),
        takeLatest(types.ADD_FEELING_REQUEST, addFeelingSaga),
        takeLatest(types.DISEASE_LIST_REQUEST, diseasesListFetch),
        takeLatest(types.ADD_DOCTOR_APPOINTMENT_REQUEST, addDoctorAppointmentSaga),
        takeLatest(types.GET_DOCTOR_APPOINTMENT_REQUEST, getdoctorAppointment),
        takeLatest(types.UPDATE_DOCTOR_APPOINTMENT_REQUEST, updateDoctorAppointmentSaga),
        takeLatest(types.UPDATE_PROFILE_PIC, updateProfilePicFetch),
        takeLatest(types.UPDATE_PROFILE_RESPONSE, updateProfileFetch),
        takeLatest(types.CHANGE_SEND_ME_ALERT, changeNotificationFetch),
        takeLatest(types.CHANGE_EMAIL_ENABLE, changeEmailEnableFetch),
        takeLatest(types.ADD_NEW_DISEASE_REQUEST, addDiseaseSaga),
        takeLatest(types.PILL_MEDICINE_LIST, pillMedicineFetch),
        takeLatest(types.ADD_PILL_REMINDER_REQUEST, addPillReminderFetch),
        takeLatest(types.ADD_KYC_VERIFICTION, kycVerificaitonSaga),
        takeLatest(types.LIST_USER_DISEASE_DOC, listUserDiseaseDocFetch),
        takeLatest(types.WALLET_TRANSACTION_HISTORY_REQUEST, walletTransactionListFetch),
        takeLatest(types.REQUEST_WALLET, requestWalletFetch),
        takeLatest(types.REQUEST_CONTENT, requestPageContentFetch),
        takeLatest(types.NOTIFICATION_REQUEST, notificationSaga),
    ]);
}
