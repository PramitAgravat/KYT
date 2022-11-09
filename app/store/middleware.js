import NavigationService from 'app/navigation/NavigationService';
import {store} from './configureStore';
import * as authActions from '../actions/authActions';
import events from 'app/utils/events';
let buffer = [];
export const jwt = store => next => action => {
    buffer.push(action);
    console.log('store',store);
    console.log('next',next);
    console.log('action',action);
    if (action.type === 'INVALID_TOKEN') {
        store.dispatch(authActions.onAuthReset())
        events.emit('unmount', { name: 'Dashboard!' })
        setTimeout(async ()=>{
            await NavigationService.navigateAndReset('Login')
        },0);
    } else {
        if (buffer.length > 20) {
            //remove all items but keep the last 20 which forms the buffer
            buffer.splice(0, buffer.length - 20);
        }
        return next(action);
    }
};
