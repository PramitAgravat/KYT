import React, { Component } from 'react';
import NavigationStack from './NavigationStack';
import NavigationService from './NavigationService';

class AppNavigator extends Component {
    componentDidMount() {
        // Run the startup saga when the application is starting
        this.props.startup()
    }

    render() {
        return (
            <View style={styles.container}>
                <AppNavigator
                    // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
                    ref={(navigatorRef) => {
                        NavigationService.setTopLevelNavigator(navigatorRef)
                    }}
                />
            </View>
        )
    }


}

export default AppNavigator;
