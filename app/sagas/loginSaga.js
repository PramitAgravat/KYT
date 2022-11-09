/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call, delay } from 'redux-saga/effects';
import { Toast } from "native-base";
import { navigateToHomeandReset } from "app/navigation/NavigationHelpers";
import { loginUser } from 'app/api/methods/loginUser';
import * as loginActions from 'app/actions/loginActions';
import * as authActions from 'app/actions/authActions';
import * as globalActions from "app/actions/globalActions";

// Our worker Saga that logins the user
export default function* loginAsync(action) {
    try{
    yield put(globalActions.enableLoader());

    //how to call api
    const response = yield call(loginUser, action.data);
    //mock response
    yield put(globalActions.disableLoader());
    if (response.data.status) {
        yield put(loginActions.onLoginResponse());
        yield put(authActions.onLoginSuccess(response.data.result));
        yield put(loginActions.loginSuccess(response.data));
        yield put(loginActions.onLoginReset());
        yield call(navigateToHomeandReset);
    } else if (response.data.v_error) {
        console.log('response.data',response.data);
        yield put(loginActions.loginFailed(response.data.message));
    } else {
        yield Toast.show({
            text: response.data.message,
            buttonText: "Okay",
            duration: 3000,
            type: "danger"
        });
    }
}
catch (e) {

}
}

export const updateProfile = function updateProfile(data) {
    console.log("Update Profile", data)
    // yield put(authActions.onLoginSuccess(response.data.result));
    return Api(
        ApiConstants.updateProfile,
        data,
        'post',
        store.getState().authReducer.token
    );
}
