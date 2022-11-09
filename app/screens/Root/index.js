import React, { Component } from 'react'
import NavigationService from 'app/navigation/NavigationService'
import AppNavigator from 'app/navigation/NavigationStack'
import { View } from 'react-native'
import { connect } from 'react-redux'
import * as rootAction from 'app/actions/rootAction';
import { PropTypes } from 'prop-types'
import styles from './styles';
class RootScreen extends Component {



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

RootScreen.propTypes = {
    startup: PropTypes.func,
}

const mapStateToProps = (state) => ({
    status:  state.authReducer.isAuth,
    isNewUser:state.introReducer.isNewUser
})

const mapDispatchToProps = (dispatch) => ({
    startup: (status,isNewUser) => dispatch(rootAction.startup(status,isNewUser)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RootScreen)
