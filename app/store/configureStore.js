import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducers from 'app/reducers'; // where reducers is a object of reducers
import sagas from 'app/sagas';
import navigationDebouncer from 'react-navigation-redux-debouncer';

const config = {
    key: 'root',
    storage,
    // blacklist: ['nav','navigation', 'loadingReducer','registerReducer','loginReducer','homeReducer','globalReducer'],
    debug: true, //to get useful logging
    whitelist: ['authReducer', 'introReducer']
};

const middleware = [];
import { jwt } from './middleware';
const sagaMiddleware = createSagaMiddleware();
middleware.push(jwt);
middleware.push(sagaMiddleware);

if (__DEV__) {
  //  middleware.push(createLogger());
    /* global.XMLHttpRequest = global.originalXMLHttpRequest
         ? global.originalXMLHttpRequest
         : global.XMLHttpRequest;*/
    /*global.FormData = global.originalFormData
        ? global.originalFormData
        : global.FormData;*/
}
if (__DEV__) {
   /* global.XMLHttpRequest = global.originalXMLHttpRequest ?
        global.originalXMLHttpRequest :
        global.XMLHttpRequest;
    global.FormData = global.originalFormData ?
        global.originalFormData :
        global.FormData;
    global.Blob = global.originalBlob ?
        global.originalBlob :
        global.Blob;
    global.FileReader = global.originalFileReader ?
        global.originalFileReader :
        global.FileReader;*/
}
middleware.push(navigationDebouncer(400));

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
// const initialState = {};
const persistConfig = { enhancers };
export const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
    //   console.log('Test', store.getState());
});

const configureStore = () => {
    return { persistor, store };
};

sagaMiddleware.run(sagas);

export default configureStore;
