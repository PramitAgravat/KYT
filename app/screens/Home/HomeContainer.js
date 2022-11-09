import React, {Component} from 'react';

import HomeView from './HomeView';
import { connect } from 'react-redux';
import * as homeActions from "app/actions/homeActions";
import * as authActions from "app/actions/authActions";
import * as introActions from "app/actions/introActions";
import {AppTour, AppTourSequence} from 'react-native-app-tour';
import {DeviceEventEmitter} from 'react-native';

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.appTourTargets = []
    }



    render() {
        return <HomeView {...this.props} addAppTourTarget={appTourTarget => {
            this.appTourTargets.push(appTourTarget)
        }} />;

    }
    componentWillMount() {
        if(!this.props.isHomePageTourDone) {
            this.registerSequenceStepEvent()
            this.registerFinishSequenceEvent()
        }
    }

    componentDidMount() {
        if(!this.props.isHomePageTourDone){
            setTimeout(() => {
                let appTourSequence = new AppTourSequence()
                this.appTourTargets.forEach(appTourTarget => {
                    appTourSequence.add(appTourTarget)
                })

                AppTour.ShowSequence(appTourSequence)
                this.props.homePageTour()
            }, 1000)
        }

    }
    registerSequenceStepEvent = () => {
        if (this.sequenceStepListener) {
            this.sequenceStepListener.remove()
        }
        this.sequenceStepListener = DeviceEventEmitter.addListener(
            'onShowSequenceStepEvent',
            (e: Event) => {
                console.log(e)
            }
        )
    }

    registerFinishSequenceEvent = () => {
        if (this.finishSequenceListener) {
            this.finishSequenceListener.remove()
        }
        this.finishSequenceListener = DeviceEventEmitter.addListener(
            'onFinishSequenceEvent',
            (e: Event) => {
                console.log(e)
            }
        )
    }
}

function mapStateToProps(state) {
    return {
        userProfile: state.authReducer.mainUser,
        videoList: state.homeReducer.videoList,
        blogList: state.homeReducer.blogList,
        addFeeling: state.homeReducer.addFeeling,
        addFeelingSuccess: state.homeReducer.addFeelingSuccess,
        loader: state.globalReducer.is_visible,
        isHomePageTourDone:state.introReducer.isHomePageTourDone
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getVideoData: (data) => dispatch(homeActions.getVideoData(data)),
        getBlogData: (data) => dispatch(homeActions.getBlogList(data)),
        addFeeling: (data) => dispatch(homeActions.requestAddFeeling(data)),
        addFeelingSuccessData: (data) => dispatch(homeActions.addFeelingSuccess(data)),
        updateAuth: (data) => dispatch(authActions.onLoginSuccess(data)),
        homePageTour:() => dispatch(introActions.homePageTour()),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);
