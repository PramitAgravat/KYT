import {  call } from 'redux-saga/effects';
import { navigateToVideo} from 'app/navigation/NavigationHelpers';
import NavigationService from "app/navigation/NavigationService";

export default function* introAsync() {
    //yield call(navigateToVideo);
    NavigationService.navigateAndReset('VideoSignInOut');
}
