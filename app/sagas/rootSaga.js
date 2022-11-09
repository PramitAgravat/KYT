import { delay,put,call } from 'redux-saga/effects'
import * as authActions from 'app/actions/authActions';
import NavigationService from 'app/navigation/NavigationService'
import {checkAuth} from "app/api/methods/rootUser";
import * as globalActions from '../actions/globalActions';
import {Toast} from "native-base";

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export default function* startup(action) {
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
   // yield put(ExampleActions.fetchUser())

    // Add more operations you need to do at startup here
    // ...

    /*const response = yield call(checkAuth);
    if(!response.status){
        yield put(authActions.onAuthReset());
        if(action.isNewUser){
            NavigationService.navigateAndReset('VideoSignInOut');
        }else{
            NavigationService.navigateAndReset('Intro');
        }
    }*/
    //yield delay(2000);
    // When those operations are finished we redirect to the main screen

    if(action.status){
       // const response = yield call(checkAuth);
       // yield put(authActions.onLoginSuccess(response.data.result));
        NavigationService.navigateAndReset('Home');
    }else {
        yield put(authActions.onAuthReset());
        if(action.isNewUser){
            NavigationService.navigateAndReset('Intro');
        }else{
            NavigationService.navigateAndReset('VideoSignInOut');
        }
    }

    //NavigationService.navigateAndReset('VideoSignInOut')
}
