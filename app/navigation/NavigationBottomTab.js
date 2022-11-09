import React from 'react';
import {
  createBottomTabNavigator,
  NavigationActions,
  StackActions,
} from 'react-navigation';

import Home from 'app/screens/Home';
import RxTimeline from 'app/screens/RxTimeline';
import Wallet from 'app/screens/Wallet';
import HealthRecord from 'app/screens/HealthRecord';
import PillReminder from 'app/screens/PillReminder';

import {Image, View} from 'react-native';
import images from 'app/config/images';
import { fadeIn } from 'react-navigation-transitions';
const HomeTabIcon = ({focused, tintColor}) => (
  <View>
    {focused ? (
      <Image
        source={images.footerTab.homeSelected}
        style={{width: 30, height: 25}}
        resizeMode={'contain'}
      />
    ) : (
      <Image
        source={images.footerTab.home}
        style={{width: 25, height: 20}}
        resizeMode={'contain'}
      />
    )}
  </View>
);
const RxTimelineTabIcon = ({focused, tintColor}) => (
  <View>
    {focused ? (
      <Image
        source={images.footerTab.bar_chartSelected}
        style={{width: 30, height: 25}}
        resizeMode={'contain'}
      />
    ) : (
      <Image
        source={images.footerTab.bar_chart}
        style={{width: 25, height: 20}}
        resizeMode={'contain'}
      />
    )}
  </View>
);
const WalletTabIcon = ({focused, tintColor}) => (
  <View>
    {focused ? (
      <Image
        source={images.footerTab.walletSelected}
        style={{width: 30, height: 25}}
        resizeMode={'contain'}
      />
    ) : (
      <Image
        source={images.footerTab.wallet}
        style={{width: 25, height: 20}}
        resizeMode={'contain'}
      />
    )}
  </View>
);
const HealthRecordTabIcon = ({focused, tintColor}) => (
  <View>
    {focused ? (
      <Image
        source={images.footerTab.heartSelected}
        style={{width: 30, height: 25}}
        resizeMode={'contain'}
      />
    ) : (
      <Image
        source={images.footerTab.heart}
        style={{width: 25, height: 20}}
        resizeMode={'contain'}
      />
    )}
  </View>
);
const PillReminderTabIcon = ({focused, tintColor}) => (
  <View>
    {focused ? (
      <Image
        source={images.footerTab.reminderSelected}
        style={{width: 30, height: 25}}
        resizeMode={'contain'}
      />
    ) : (
      <Image
        source={images.footerTab.reminder}
        style={{width: 25, height: 20}}
        resizeMode={'contain'}
      />
    )}
  </View>
);
const PopularTabIcon = ({focused, tintColor}) => (
  <View>
    <Image
      source={images.footerTab.wallet}
      style={{width: 25, height: 20}}
      resizeMode={'contain'}
    />
  </View>
);

export const NavigationBottomTab = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
        tabBarIcon: HomeTabIcon,
        tabBarOnPress: ({navigation}) => {
          console.log('press home');
          //events.emit('reset_all_home', { name: 'Dashboard!' })
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Home'})],
          });
          navigation.dispatch(resetAction);
        },
      },
    },
    HealthRecord: {
      screen: HealthRecord,
      navigationOptions: {
        header: null,
        tabBarIcon: HealthRecordTabIcon,
        tabBarOnPress: ({navigation}) => {
          console.log('press health');
          navigation.navigate('HealthRecord');
        },
      },
    },
    RxTimeline: {
      screen: RxTimeline,
      navigationOptions: {
        header: null,
        tabBarIcon: RxTimelineTabIcon,
        tabBarOnPress: ({navigation}) => {
          console.log('press rx');
          navigation.navigate('RxTimeline');
        },
      },
    },
    PillReminder: {
      screen: PillReminder,
      navigationOptions: {
        header: null,
        tabBarIcon: PillReminderTabIcon,
        tabBarOnPress: ({navigation}) => {
          console.log('press notification');
          navigation.navigate('PillReminder');
        },
      },
    },
    Wallet: {
      screen: Wallet,
      navigationOptions: {
        header: null,
        tabBarIcon: WalletTabIcon,
        tabBarOnPress: ({navigation}) => {
          console.log('press wallet');
          navigation.navigate('Wallet');
        },
      },
    },
  },
  {
    transitionConfig: () => fadeIn(),
    tabBarOptions: {
      activeTintColor: '#03694d',
      showLabel: false,
      labelStyle: {
        // fontWeight:'bold',
        fontSize: 11,
      },
      // style: style.tabBar,
    },
  },
);
