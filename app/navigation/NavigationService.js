import { NavigationActions,StackActions } from 'react-navigation';

let _navigator;
/**
 * This function is called when the RootScreen is created to set the navigator instance to use.
 */
function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}
/**
 * Call this function when you want to navigate to a specific route.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigate(routeName, params) {
    console.log('routeName',routeName)
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
}

function goBack(key) {
    _navigator.dispatch(
        NavigationActions.back({
            key: key
        })
    );
}

// add other navigation functions that you need and export them
/**
 * Call this function when you want to navigate to a specific route AND reset the navigation history.
 *
 * That means the user cannot go back. This is useful for example to redirect from a splashscreen to
 * the main screen: the user should not be able to go back to the splashscreen.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigateAndReset(routeName, params) {
    _navigator.dispatch(
        StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName,
                    params,
                }),
            ],
        })
    )
}

export default {
    navigate,
    goBack,
    setTopLevelNavigator,
    navigateAndReset
};
