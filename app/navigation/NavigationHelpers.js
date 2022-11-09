/*
 * Actions related with navigation
 * Every navigation action should be defined here
 * Avoid using this.props.navigation inside the code
 */
import NavigationService from './NavigationService';

export function navigateToHome(params) {
    NavigationService.navigate('Home', params);
}

export function navigateToHomeandReset(params) {
    NavigationService.navigateAndReset('Home', params);
}
export function navigateToRxTimelineandReset(params) {
    NavigationService.navigateAndReset('RxTimeline', params);
}
export function navigateToLoginandReset(params) {
    NavigationService.navigateAndReset('Login', params);
}

export function navigateToLogin(params) {
    NavigationService.navigate('Login', params);
}

export function navigateToNotification(params) {
    NavigationService.navigate('Notification', params);
}

export function navigateToForgotPassword(params) {
    NavigationService.navigate('ForgotPassword', params);
}

export function navigateToProfile(params) {
    NavigationService.navigate('Profile', params);
}

export function navigateToReferralCode(params) {
    NavigationService.navigate('ReferralCode', params);
}

export function navigateToChangePassword(params) {
    NavigationService.navigate('ChangePassword', params);
}

export function navigateToFeedbackForm(params) {
    NavigationService.navigate('FeedbackForm', params);
}

export function navigateToRegister(params) {
    NavigationService.navigate('Register', params);
}

export function navigateToRxTimeline(params) {
    NavigationService.navigate('RxTimeline', params);
}

export function navigateToVideo(params) {
    NavigationService.navigate('VideoSignInOut', params);
}

export function navigateToWallet(params) {

    NavigationService.navigate('Wallet', params);
}

export function navigateToRedeemPoint(params) {

    NavigationService.navigate('RedeemPoint', params);
}

export function navigateToHealthRecord(params) {

    NavigationService.navigate('HealthRecord', params);
}

export function navigateToAddDisease(params) {

    NavigationService.navigate('AddDisease', params);
}

export function navigateToBlogDetail(params) {

    NavigationService.navigate('BlogDetail', params);
}

export function navigateToPillReminder(params) {

    NavigationService.navigate('PillReminder', params);
}

export function navigateToUpdatePillReminder(params) {

    NavigationService.navigate('UpdatePillReminder', params);
}

export function navigateToAddPillReminder(params) {

    NavigationService.navigate('AddPillReminder', params);
}

export function navigateToDiseaseInformation(params) {

    NavigationService.navigate('DiseaseInformation', params);
}

export function navigateToKYCVerificaiton(params) {

    NavigationService.navigate('KYCVerification', params);
}

export function navigateToDisease(params) {

    NavigationService.navigate('Disease', params);
}

export function navigateToDoctorAppointment(params) {

    NavigationService.navigate('DoctorAppointment', params);
}

export function navigateToUpdateDoctorAppointment(params) {

    NavigationService.navigate('UpdateDoctorAppointment', params);
}
