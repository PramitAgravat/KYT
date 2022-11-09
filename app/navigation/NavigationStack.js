import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Animated, Easing, Platform } from 'react-native';
import { fadeIn, flipY } from 'react-navigation-transitions';

import Login from 'app/screens/Login';
import ForgotPassword from 'app/screens/ForgotPassword';
import Register from 'app/screens/Register';
import Splash from 'app/screens/Splash';
import Intro from 'app/screens/Intro';
import VideoSignInOut from 'app/screens/VideoSignInOut';
import RedeemPoint from 'app/screens/Wallet/RedeemPoint';
import AddDisease from 'app/screens/HealthRecord/AddDisease';
import KYCVerification from '../screens/KYCVerification/index'
import DoctorAppointment from 'app/screens/DoctorAppointment';
import UpdateDoctorAppointment from 'app/screens/RxTimeline/UpdateDoctorAppointment';
import Notification from 'app/screens/Notification';
import AddPillReminder from 'app/screens/PillReminder/AddPillReminder';
import UpdatePillReminder from 'app/screens/RxTimeline/UpdatePillReminder';
import Profile from 'app/screens/Profile';
import EditProfile from 'app/screens/Profile/EditProfile';
import DataSharing from 'app/screens/Profile/DataSharingView';
import FeedbackForm from 'app/screens/Profile/FeedbackForm';
import ChangePassword from 'app/screens/Profile/ChangePassword';
import ReferralCode from 'app/screens/Profile/ReferralCode';
import Disease from 'app/screens/Disease';
import DiseaseInformation from '../screens/Disease/DiseaseInformation'
import BlogDetail from 'app/screens/BlogDetails'
import { NavigationBottomTab } from './NavigationBottomTab';
import InfoScreen from '../screens/Info/InfoScreen';


let SlideFromRight = (index, position, width) => {
    const translateX = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [width, 0],
    })

    return { transform: [{ translateX }] }
};

let SlideFromBottom = (index, position, height) => {
    const translateY = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [height, 0],
    })

    return { transform: [{ translateY }] }
};

let CollapseTransition = (index, position) => {
    const opacity = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 1]
    });

    const scaleY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 1]
    });

    return {
        opacity,
        transform: [{ scaleY }]
    }
}

const TransitionConfiguration = () => {
    return {
        transitionSpec: {
            duration: 750,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: (sceneProps) => {
            const { layout, position, scene } = sceneProps;
            const width = layout.initWidth;
            const height = layout.initHeight;
            const { index, route } = scene
            const params = route.params || {}; // <- That's new
            const transition = params.transition;  //|| 'default' <- That's new
            return {
                default: SlideFromRight(index, position, height),
                slideRightTransition: SlideFromRight(index, position, width),
                bottomTransition: SlideFromBottom(index, position, height),
                collapseTransition: CollapseTransition(index, position)
            }[transition];
        },
    }
}


/*const AppStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: { header: null }
    }

});
const AuthStack = createStackNavigator({
    Intro:{
        screen: Intro,
        navigationOptions: { header: null }
    },
    Login: {
        screen: Login,
        navigationOptions: { header: null }
    },
    /!*Register: {
        screen: Register,
        navigationOptions: { header: null }
    },*!/
    VideoSignInOut: {
        screen: VideoSignInOut,
        navigationOptions: { header: null }
    }

},{
    transitionConfig: TransitionConfiguration
});*/
// const RNApp = createSwitchNavigator(
//     {
//         SplashLoading: Splash,
//         App: AppStack,
//         Auth: AuthStack,
//     }
// )


const RNApp = createStackNavigator(
    {
        Home: {
            screen: NavigationBottomTab,
            navigationOptions: { header: null }
        },
        Intro: {
            screen: Intro,
            navigationOptions: { header: null }
        },
        Login: {
            screen: Login,
            navigationOptions: { header: null }
        },
        ForgotPassword: {
            screen: ForgotPassword,
            navigationOptions: { header: null }
        },
        Register: {
            screen: Register,
            navigationOptions: { header: null }
        },
        VideoSignInOut: {
            screen: VideoSignInOut,
            navigationOptions: { header: null }
        },
        // RxTimeline: {
        //     screen: RxTimeline,
        //     navigationOptions: { header: null }
        // },
        // Wallet: {
        //     screen: Wallet,
        //     navigationOptions: { header: null }
        // },
        KYCVerification: {
            screen: KYCVerification,
            navigationOptions: { header: null }
        },
        AddDisease: {
            screen: AddDisease,
            navigationOptions: { header: null }
        },
        Disease: {
            screen: Disease,
            navigationOptions: { header: null }
        },
        Info: {
            screen: InfoScreen,
            navigationOptions: { header: null }
        },
        // DiseaseChildView: {
        //     screen: DiseaseChildView,
        //     navigationOptions: { header: null }
        // },
        DoctorAppointment: {
            screen: DoctorAppointment,
            navigationOptions: { header: null }
        },
        UpdateDoctorAppointment: {
            screen: UpdateDoctorAppointment,
            navigationOptions: { header: null }
        },
        Notification: {
            screen: Notification,
            navigationOptions: { header: null }
        },
        // PillReminder: {
        //     screen: PillReminder,
        //     navigationOptions: { header: null }
        // },
        AddPillReminder: {
            screen: AddPillReminder,
            navigationOptions: { header: null }
        },
        UpdatePillReminder: {
            screen: UpdatePillReminder,
            navigationOptions: { header: null }
        },
        Profile: {
            screen: Profile,
            navigationOptions: { header: null }
        },
        EditProfile: {
            screen: EditProfile,
            navigationOptions: { header: null }
        },
        DataSharing: {
            screen: DataSharing,
            navigationOptions: { header: null }
        },
        ChangePassword: {
            screen: ChangePassword,
            navigationOptions: { header: null }
        },
        FeedbackForm: {
            screen: FeedbackForm,
            navigationOptions: { header: null }
        },
        ReferralCode: {
            screen: ReferralCode,
            navigationOptions: { header: null }
        },
        // Home: {
        //     screen: Home,
        //     navigationOptions: { header: null, gesturesEnabled: false }
        // },
        BlogDetail: {
            screen: BlogDetail,
            navigationOptions: { header: null, }
        },
        DiseaseInformation: {
            screen: DiseaseInformation,
            navigationOptions: { header: null, }
        },
        RedeemPoint: {
            screen: RedeemPoint,
            navigationOptions: { header: null, }
        },
        SplashLoading: Splash,
        /*NavigationBottomTab: {
            screen: NavigationBottomTab,
            navigationOptions: {
                gesturesEnabled: false
            }
        }*/
    },
    {
        headerMode: 'none',
        initialRouteName: 'SplashLoading',
        transitionConfig: () => fadeIn(),
    }
);

export default createAppContainer(RNApp);
