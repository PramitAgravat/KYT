/* App config for apis
 */
const ApiConstants = {
    //BASE_URL: 'http://192.168.1.153:8001/',
    // BASE_URL: 'http://13.233.80.160/kyt-admin/',
    BASE_URL: 'https://app-admin.thekyt.in/',
    LOGIN: 'api-user/login',
    LOGOUT: 'api-user/logout',
    SEND_OTP: 'api-user/send-otp',
    RESET: 'api-user/reset',
    CHECK_OTP: 'api-user/check-otp',
    FORGET_PASSWORD: 'api-user/forget-password',
    CHANGE_PASSWORD: 'api-user/change-password',
    REGISTER: 'api-user/register',
    VIDEO_LIST: 'api-user/video-list',
    BLOG_LIST: 'api-user/blog-list',
    CHECK_AUTH: 'api-user/check-auth',
    GET_DISEASE_TYPE: 'api-user/get-user-disease',
    PILL_REMINDER_LIST: 'api-user/get-pill-reminder',
    ADD_FEELING_TODAY: 'api-user/add-feeling-today',
    DISEASE_LIST: 'api-user/disease',
    UPDATE_DISEASE_DOCUMENT: 'api-user/update-disease-document',
    UPDATE_DISEASE_FOLDER: 'api-user/update-user-disease',
    ADD_USER_DISEASE: 'api-user/add-user-disease',
    ADD_DOCTOR_APPOINTMENT: 'api-user/add-doctor-appointment',
    GET_DOCTOR_APPOINTMENT: "api-user/get-doctor-appointment",
    UPDATE_DOCTOR_APPOINTMENT: "api-user/update-doctor-appointment",
    DELETE_DOCTOR_APPOINTMENT: 'api-user/delete-doctor-appointment',
    GET_PROFILE: 'api-user/get-profile',
    UPDATE_PROFILE: 'api-user/update-profile',
    UPDATE_PROFILE_IMAGE: 'api-user/update-image',

    IS_SEND_ME_ALERT: 'api-user/is-send-me-alerts',
    IS_EMAIL_ENABLE: 'api-user/is-email-setting-enable',

    IS_INSURANCE_CLAIM_DATA: 'api-user/is-insurance-claims-data',
    IS_MEDICAL_EXPENSES: 'api-user/is-medical-expenses',
    IS_PRESCRIPTION: 'api-user/is-prescription',
    IS_TEST_RESULTS: 'api-user/is-test-results',
    IS_HOSPITAL_DISCHARGE_PAPERS: 'api-user/is-hospital-discharge-papers',
    IS_RADIOLOGY_AND_IMAGING: 'api-user/is-radiology-and-imaging',
    IS_CLINICAL_PHOTOGRAPH: "api-user/is-clinical-photograph",
    IS_LABORATORY_TESTS: 'api-user/is-laboratory-tests',
    IS_GENETIC_TESTS: 'api-user/is-genetic-tests',

    WALLET_TRANSACTION_HISTORY: 'api-user/get-transaction-history',
    REQUEST_WALLET: 'api-user/request-wallet',
    PAGE_CONTENT: 'api-user/page-content',
    MEDICINE_TYPE: 'api-user/medicine-type',
    GET_PILL_REMINDER: 'api-user/edit-pill-reminder',
    ADD_PILL_REMINDER: 'api-user/add-pill-reminder',
    UPDATE_PILL_REMINDER: 'api-user/update-pills',

    ADD_USER_KYC_IMAGE: 'api-user/add-user-kyc',
    ADD_AADHAR_IMAGE: 'api-user/update-aadhar-image',
    ADD_HEALTH_IMAGE: 'api-user/update-health-image',

    ADD_DISEASE_DOC: 'api-user/add-disease-document',

    YOUTUBE_DATA_API_KEY: "AIzaSyB4Dvcjbp5l3Io0WtRBUiUAujHWi3NF3LE",
    SHOW_DISEASE_DOC: 'api-user/show-disease-document',
    SEND_DISEASE_DOC_EMAIL: 'api-user/send-disease-doc-email',
    SEND_EMAIL_TO_MYSELF: 'api-user/send-email-to-myself',
    CONVERT_IMAGE_TO_PDF: 'api-user/convert-image-to-pdf',
    DELETE_DISEASE_DOC: 'api-user/delete-disease-document',
    DELETE_DISEASE_FOLDER: 'api-user/delete-user-disease',

    GET_FEELING_TODAY: 'api-user/get-feeling-today',
    UPDATE_FEELING_TODAY: 'api-user/update-feeling-today',
    DELETE_FEELING_TODAY: 'api-user/delete-feeling-today',
    AUTH_FETCH: 'api-user/user',
    RX_TIMELINE: 'api-user/rx-timeline',

    SKIP_PILL: 'api-user/skip-pill-reminder-time',
    TAKE_PILL: 'api-user/take-pill-reminder-time',
    DELETE_PILL: 'api-user/delete-pill-reminder-time',
    RESCHEDULE_PILL: 'api-user/reschedule-pill-reminder-time',

    GET_NOTIFICATION: 'api-user/get-notification',
    GET_USER_LOGIN_STATUS: 'api-user/get-user-login-status',

    FEEDBACK_FORM: 'api-user/feedback-form',
    DELETE_PILL_REMINDER: 'api-user/delete-pill-reminder'
};

export default ApiConstants;
