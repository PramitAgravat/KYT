import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';
import HealthRecordView from './HealthRecordView';
import { connect } from 'react-redux';
import * as healthRecordActions from "app/actions/healthRecordActions";
import * as introActions from "app/actions/introActions";
import { AppTour, AppTourSequence, AppTourView } from 'react-native-app-tour';

class HealthRecordContainer extends Component {
    constructor(props) {
        super(props)

        this.appTourTargets = []
    }
    componentWillMount() {
        if(!this.props.isHealthScreenOpen) {
            this.registerSequenceStepEvent()
            this.registerFinishSequenceEvent()
        }
    }

    componentDidMount() {
        if(!this.props.isHealthScreenOpen){
            setTimeout(() => {
                let appTourSequence = new AppTourSequence()
                this.appTourTargets.forEach(appTourTarget => {
                    appTourSequence.add(appTourTarget)
                })

                AppTour.ShowSequence(appTourSequence)
                this.props.openHealthScreen()
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
    render() {
        return <HealthRecordView {...this.props} addAppTourTarget={appTourTarget => {
            this.appTourTargets.push(appTourTarget)
        }} />;
    }
}

function mapStateToProps(state) {
    return {
        diseaseList: state.healthRecordReducer.diseaseList,
        isHealthScreenOpen: state.introReducer.isHealthScreenOpen
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getDisease: (data) => dispatch(healthRecordActions.requestDisease(data)),
        openHealthScreen: () => dispatch(introActions.openHealthScreen())
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HealthRecordContainer);
