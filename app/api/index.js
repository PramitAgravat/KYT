// General api to access data
import ApiConstants from './ApiConstants';
const axios = require('axios');
import { store } from "app/store/configureStore";
import * as authActions from 'app/actions/authActions';
import NavigationService from 'app/navigation/NavigationService';
const instance = axios.create({
    baseURL: ApiConstants.BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': "*"
    },
    timeout: 100 * 1000,
});
instance.interceptors.request.use(function (config) {
    const token = store.getState().authReducer.token;

    if (token != null && token != '') {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, function (err) {
    return Promise.reject(err);
});
instance.interceptors.response.use((response) => {
    return response;
},  async (error) =>{
    // Do something with response error
        console.log('error',error);
    console.log('error.response',error.response);
    if (error.response.status === 401) {
        console.log('unauth');
        await store.dispatch(authActions.unAuthenticated())
        return;
    }
    return Promise.reject(error.response);
});
/*export default async function api(path, params, method, token) {
    let options;
    options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            ...(token && { Authorization: 'Bearer '+token })
        },
        method: method,
        ...(params && { body: JSON.stringify(params) })
    };

    return fetch(ApiConstants.BASE_URL + path, options)
        .then(resp => {
            return resp.json()
        })
        .then(json => json)
        .catch(error => {
            console.log('error',error);
        });
}*/

export default async function api(path, params, method,header=null) {

    if (method === 'get') {
        return await instance.get(path, params)
    } else {
        console.log('header',header);
        return await instance.post(path, params,header)
    }

}


