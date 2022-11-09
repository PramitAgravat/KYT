/**
 * React Native App
 * Everthing starts from the entrypoint
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Root } from "native-base";
import RootScreen from 'app/screens/Root';
import configureStore from 'app/store/configureStore';
const { persistor, store } = configureStore();
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import events from 'app/utils/events';
import NotifService from './NotifService';
import NavigationService from './navigation/NavigationService';


export default class Entrypoint extends Component {
    constructor(props) {
        super(props);

        /*if (__DEV__) {
            global.XMLHttpRequest = global.originalXMLHttpRequest ?
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
                global.FileReader;
        }*/
        this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    }
    /*async componentDidMount() {
        const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const action = notificationOpen.action;
            const notification: Notification = notificationOpen.notification;
            var seen = [];
            alert(JSON.stringify(notification.data, function(key, val) {
                if (val != null && typeof val == "object") {
                    if (seen.indexOf(val) >= 0) {
                        return;
                    }
                    seen.push(val);
                }
                return val;
            }));
        }
        const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
            .setDescription('My apps test channel');
// Create the channel
        firebase.notifications().android.createChannel(channel);
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });
        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
            // Process your notification as required
            notification
                .android.setChannelId('test-channel')
                .android.setSmallIcon('ic_launcher');
            firebase.notifications()
                .displayNotification(notification);

        });
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
            var seen = [];
            alert(JSON.stringify(notification.data, function(key, val) {
                if (val != null && typeof val == "object") {
                    if (seen.indexOf(val) >= 0) {
                        return;
                    }
                    seen.push(val);
                }
                return val;
            }));
            firebase.notifications().removeDeliveredNotification(notification.notificationId);

        });
    }
    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
    }*/
    async componentDidMount() {
        await this.checkPermission();
        await this.createNotificationListeners(); //add this line

    }
    async componentWillUnmount() {
        await this.notificationListener();
        await this.notificationOpenedListener();
        await this._foregroundNotificationsListener();
    }
    onRegister(token) {
        console.log(token);
        this.setState({ registerToken: token.token, gcmRegistered: true });
    }

    onNotif(notif) {
        console.log(notif);
        events.emit('new_notification', true)
        if(notif.type == 'WALLET_NOTIFICATIONS' || notif.type == 'PAYTM_REDEEM'){
            NavigationService.navigate('Wallet');
        }else if(notif.type == 'PAN_CARD_UNVERIFIED' || notif.type == 'AADHAR_CARD_UNVERIFIED' || notif.type == 'HEALTH_INSURANCE_CARD_UNVERIFIED' || notif.type == 'USER_DISEASE_DOCUMENT_UNVERIFIED' || notif.type == 'HEALTH_INSURANCE_CARD_UPLOADED' ||  notif.type == 'AADHAR_CARD_UPLOADED' || notif.type == 'PAN_CARD_UPLOADED'){
            NavigationService.navigate('Profile');
        }else if(notif.type == 'PILL_REMINDER'){
            NavigationService.navigate('PillReminder');
        }else if(notif.type == 'DOCTOR_APPOINTMENT'){
            NavigationService.navigate('RxTimeline');
        }

    }

    handlePerm(perms) {
        Alert.alert("Permissions", JSON.stringify(perms));
    }
    //1
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    //3
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log("Token", fcmToken)
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }

    //2
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }
    _foregroundNotificationsListener = async () => {
        // to process message broadcasted from onMessageReceived method
        this.messageListener = firebase.messaging().onMessage((message) => {
            // put your logic to process message
        })

        // get notification data when notification is clicked when app is in foreground
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationData) => {
            console.log('notificationData',notificationData);
           // this.notif.localNotif(notificationData)
        });

        // get notification data when notification is clicked to open app when app is in background
        firebase.notifications().getInitialNotification()
            .then((notificationData) => {
            })
    }
    async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const { title, body } = notification.data;
            console.log('Notification Listener 1', notification.data);
            this.notif.localNotif(notification.data);

           // this.showAlert(title, body);
        });

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { title, body } = notificationOpen.notification.data;
            console.log('Notification Listener 2', title + "<-----Body---->" + body);
            console.log('notificationData',notificationOpen.notification);
           // this.notif.localNotif(notificationOpen.notification.data);
          //  this.showAlert(title, body);
        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen2 = await firebase.notifications().getInitialNotification();
        if (notificationOpen2) {
            const { title, body } = notificationOpen.notification.data;
            console.log('Notification Listener 3', title + "<-----Body---->" + body);
            console.log('Test',notificationOpen);
            this.onNotif({
                type:notificationOpen.notification.data.type
            })
           // this.notif.localNotif(notificationOpen.notification.data)
           // this.showAlert(title, body);
        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage((message) => {
            //process data message
            console.log('Message Listener ', JSON.stringify(message));
        });
    }
    showAlert(title, body,type) {
        /*Alert.alert(
            title, body,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );*/
        console.log('title',title);
        setTimeout(()=>{
            events.emit('new_notification', {title:title,body:body})
        },500)


    }

    render() {
        return (
            <Root>
                <Provider store={store}>
                    <PersistGate
                        // loading={<ActivityIndicator />}
                        persistor={persistor}
                    >
                        <RootScreen />
                    </PersistGate>
                </Provider>
            </Root>
        );
    }
}
